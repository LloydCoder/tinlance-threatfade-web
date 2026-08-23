import { NextResponse } from "next/server";
import { getPlaygroundDataset, playgroundRequestSchema } from "@/lib/playground";
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
function key(request: Request) { return (request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "anonymous").slice(0, 80); }
function rate(request: Request) { const k = key(request), now = Date.now(), old = hits.get(k); if (!old || old.resetAt <= now) { hits.set(k, { count: 1, resetAt: now + WINDOW_MS }); return { blocked: false, remaining: 19, resetAt: now + WINDOW_MS }; } if (old.count >= MAX_REQUESTS) return { blocked: true, remaining: 0, resetAt: old.resetAt }; old.count += 1; return { blocked: false, remaining: MAX_REQUESTS - old.count, resetAt: old.resetAt }; }
export async function GET() { return NextResponse.json({ mode: "curated-only", arbitrary_uploads: false, production_engine: false }); }
export async function POST(request: Request) {
  const limited = rate(request);
  if (limited.blocked) return NextResponse.json({ error: "Playground rate limit exceeded." }, { status: 429, headers: { "Retry-After": String(Math.ceil((limited.resetAt - Date.now()) / 1000)) } });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 2048) return NextResponse.json({ error: "Request body exceeds the 2 KB playground limit." }, { status: 413 });
  try {
    const parsed = playgroundRequestSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid playground scenario." }, { status: 400 });
    const response = NextResponse.json(getPlaygroundDataset(parsed.data.scenario));
    response.headers.set("Cache-Control", "no-store"); response.headers.set("X-Playground-Mode", "curated-only"); response.headers.set("X-RateLimit-Remaining", String(limited.remaining));
    return response;
  } catch { return NextResponse.json({ error: "Malformed request." }, { status: 400 }); }
}
