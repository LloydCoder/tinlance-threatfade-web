import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { z } from "zod";
import { trackServerEvent } from "@/lib/analytics/server";

const schema = z.object({
  type: z.enum(["reference", "case-study", "research", "feedback"]),
  message: z.string().trim().min(10).max(2000),
});

const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function trustedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}

function allow(key: string) {
  const now = Date.now();
  const current = buckets.get(key);
  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character] ?? character);
}

export async function POST(request: NextRequest) {
  if (!trustedOrigin(request)) return NextResponse.json({ error: "Cross-origin request denied" }, { status: 403 });
  if (!allow(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown")) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return NextResponse.json({ error: "JSON request body required" }, { status: 415 });

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return NextResponse.json({ error: "Authentication is not configured" }, { status: 503 });
  const token = await getToken({ req: request, secret, cookieName: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}threatfade.session-token` });
  const email = typeof token?.email === "string" ? token.email : "";
  if (!email) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  let raw: unknown;
  try { raw = await request.json(); } catch { return NextResponse.json({ error: "Invalid request" }, { status: 400 }); }
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.THREATFADE_LEAD_TO_EMAIL;
  const from = process.env.THREATFADE_LEAD_FROM_EMAIL;
  if (!apiKey || !to || !from) return NextResponse.json({ error: "Customer request intake is not configured" }, { status: 503 });

  const html = `<h2>ThreatFade customer ${escapeHtml(parsed.data.type)} request</h2><p><strong>Authenticated account:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br>")}</p>`;
  try {
    const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: email, subject: `ThreatFade customer ${parsed.data.type} request`, html }), redirect: "error", cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error("notification rejected");
  } catch {
    return NextResponse.json({ error: "Customer request service temporarily unavailable" }, { status: 503 });
  }
  try { await trackServerEvent("customer_request", request, { type: parsed.data.type }); } catch { /* delivery remains authoritative */ }
  return NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
}
