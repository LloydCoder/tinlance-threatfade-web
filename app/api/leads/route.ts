import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { trackServerEvent } from "@/lib/analytics/server";

const leadSchema = z.object({
  request_type: z.enum(["assessment", "pilot", "enterprise"]),
  email: z.string().trim().email().max(254),
  company: z.string().trim().min(1).max(160),
  role: z.string().trim().min(1).max(120),
  notes: z.string().trim().max(1200).optional(),
  website: z.string().max(0).optional(),
});

const WINDOW_MS = 10 * 60_000;
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientKey(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function allowed(key: string) {
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
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  if (!allowed(clientKey(request))) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers: { "Retry-After": "600", "Cache-Control": "no-store" } });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });

  const { request_type, email, company, role, notes } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.THREATFADE_LEAD_TO_EMAIL;
  const from = process.env.THREATFADE_LEAD_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    return NextResponse.json({ error: "Lead intake is not configured" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const subject = `ThreatFade ${request_type} request`;
  const html = `<h2>ThreatFade ${escapeHtml(request_type)} request</h2><p><strong>Work email:</strong> ${escapeHtml(email)}</p><p><strong>Company:</strong> ${escapeHtml(company)}</p><p><strong>Role:</strong> ${escapeHtml(role)}</p><p><strong>Notes:</strong> ${escapeHtml(notes ?? "")}</p>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, html }),
      redirect: "error",
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) throw new Error("lead notification rejected");
    await trackServerEvent(`${request_type}_request`, request);
    return NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Lead intake temporarily unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
