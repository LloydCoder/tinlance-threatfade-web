import { NextRequest, NextResponse } from "next/server";

const MAX_BODY = 1_048_576;
const MAX_TOKEN = 16_384;
const TIMEOUT_MS = 8_000;
const DETECTION_ACTIONS = new Set(["timeline", "entities", "sessions", "workflow", "cases", "disposition"]);
const QUERY_KEYS = new Set(["status", "assignee", "limit", "offset", "sort", "order"]);

function engineUrl(path: string[]) {
  const base = process.env.THREATFADE_API_URL;
  if (!base) throw new Error("THREATFADE_API_URL is not configured");
  const parsed = new URL(base);
  if (parsed.protocol !== "https:" && process.env.NODE_ENV === "production") throw new Error("ThreatFade API must use HTTPS in production");
  return new URL(`/enterprise/analyst/${path.join("/")}`, `${base.replace(/\/$/, "")}/`);
}

function validPath(path: string[]) {
  if (path.length === 1 && path[0] === "inbox") return true;
  if (path.length === 2 && path[0] === "detections" && /^\d+$/.test(path[1])) return true;
  return path.length === 3 && path[0] === "detections" && /^\d+$/.test(path[1]) && DETECTION_ACTIONS.has(path[2]);
}

function authorizationHeader(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (request.method !== "GET" && origin && origin !== request.nextUrl.origin) return null;
  const incoming = request.headers.get("authorization");
  if (!incoming) return null;
  const match = /^Bearer\s+(.+)$/i.exec(incoming);
  if (!match || match[1].length > MAX_TOKEN) return null;
  return `Bearer ${match[1]}`;
}

function safeUpstreamError(status: number) {
  if (status === 401) return { error: "Authentication required" };
  if (status === 403) return { error: "Access denied" };
  if (status === 404) return { error: "Resource not found" };
  if (status === 409) return { error: "Resource state conflict" };
  if (status === 429) return { error: "Too many requests" };
  if (status >= 500) return { error: "Analyst service unavailable" };
  return { error: "Analyst request rejected" };
}

async function fetchUpstream(url: URL, request: NextRequest, headers: HeadersInit, body: string | undefined) {
  const attempts = request.method === "GET" ? 2 : 1;
  let lastError: unknown;
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      return await fetch(url, { method: request.method, headers, body, redirect: "error", cache: "no-store", signal: controller.signal });
    } catch (error) {
      lastError = error;
      if (attempt + 1 < attempts) await new Promise((resolve) => setTimeout(resolve, 250));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError;
}

async function forward(request: NextRequest, path: string[]) {
  if (!validPath(path)) return NextResponse.json({ error: "Route not available" }, { status: 404 });
  const authorization = authorizationHeader(request);
  if (!authorization) return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  let url: URL;
  try { url = engineUrl(path); } catch { return NextResponse.json({ error: "Analyst API is not configured securely" }, { status: 503 }); }

  for (const [key, value] of request.nextUrl.searchParams) {
    if (!QUERY_KEYS.has(key) || value.length > 128) return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 });
    url.searchParams.set(key, value);
  }

  const headers: HeadersInit = { Accept: "application/json", Authorization: authorization };
  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().startsWith("application/json")) return NextResponse.json({ error: "JSON request body required" }, { status: 415 });
    const raw = await request.arrayBuffer();
    if (raw.byteLength > MAX_BODY) return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    try { body = JSON.stringify(JSON.parse(new TextDecoder().decode(raw))); } catch { return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }); }
    headers["Content-Type"] = "application/json";
  }

  try {
    const response = await fetchUpstream(url, request, headers, body);
    const payload = await response.arrayBuffer();
    if (payload.byteLength > MAX_BODY) return NextResponse.json({ error: "Upstream response too large" }, { status: 502 });
    if (!response.ok) return NextResponse.json(safeUpstreamError(response.status), { status: response.status });
    const output = new NextResponse(payload, { status: response.status });
    output.headers.set("Content-Type", "application/json");
    const requestId = response.headers.get("x-request-id");
    if (requestId && /^[A-Za-z0-9._:-]{1,128}$/.test(requestId)) output.headers.set("X-Request-ID", requestId);
    return output;
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return NextResponse.json({ error: aborted ? "Analyst service timed out" : "Analyst service unavailable" }, { status: aborted ? 504 : 503 });
  }
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, (await context.params).path); }
export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, (await context.params).path); }
export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) { return forward(request, (await context.params).path); }
