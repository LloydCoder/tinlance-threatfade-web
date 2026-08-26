import { NextRequest, NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { randomUUID } from "node:crypto";
import { sanitizeAnalyticsEvent } from "@/lib/analytics/taxonomy";
import { analyticsProvider } from "@/lib/analytics/provider";

const ANON_COOKIE = "tf_anon_id";
const MAX_BODY_BYTES = 12_000;
const WINDOW_MS = 60_000;
const MAX_EVENTS_PER_WINDOW = 30;
const rateBuckets = new Map<string, { count: number; resetAt: number }>();

function requestOriginIsTrusted(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip") || "unknown";
}

function allowRequest(key: string) {
  const now = Date.now();
  const current = rateBuckets.get(key);
  if (!current || current.resetAt <= now) {
    rateBuckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (current.count >= MAX_EVENTS_PER_WINDOW) return false;
  current.count += 1;
  return true;
}

function isOversized(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  return Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES;
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  if (!requestOriginIsTrusted(request)) {
    return NextResponse.json({ error: "Untrusted origin" }, { status: 403 });
  }
  if (!allowRequest(clientKey(request))) {
    return NextResponse.json(
      { error: "Too many analytics events" },
      { status: 429, headers: { "Retry-After": "60", "Cache-Control": "no-store" } },
    );
  }
  if (isOversized(request)) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = sanitizeAnalyticsEvent(raw);
  const cookieStore = await cookies();
  let distinctId = cookieStore.get(ANON_COOKIE)?.value;
  if (!distinctId || !/^[0-9a-f-]{36}$/i.test(distinctId)) distinctId = randomUUID();

  const event = {
    ...parsed,
    path: parsed.path.split("?")[0].slice(0, 512),
    referrer: parsed.referrer ? new URL(parsed.referrer).origin : undefined,
  };

  try {
    await analyticsProvider.capture(event, {
      distinctId,
      receivedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ error: "Analytics temporarily unavailable" }, { status: 503 });
  }

  const response = NextResponse.json({ ok: true }, { status: 202, headers: { "Cache-Control": "no-store" } });
  if (!cookieStore.get(ANON_COOKIE)) {
    response.cookies.set(ANON_COOKIE, distinctId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 180,
    });
  }
  return response;
}

export async function GET() {
  const headerStore = await headers();
  const host = headerStore.get("host");
  return NextResponse.json(
    { service: "conversion-analytics", configured: Boolean(host && process.env.POSTHOG_PROJECT_API_KEY) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
