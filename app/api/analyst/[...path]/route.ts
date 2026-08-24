import { NextRequest, NextResponse } from "next/server";

const ALLOWED = new Set(["inbox", "detections"]);
const MAX_BODY = 1_048_576;

function engineUrl(path: string[]) {
  const base = process.env.THREATFADE_API_URL;
  if (!base) throw new Error("THREATFADE_API_URL is not configured");
  return new URL(`/enterprise/analyst/${path.join("/")}`, `${base.replace(/\/$/, "")}/`);
}

function authorized(request: NextRequest) {
  const token = process.env.THREATFADE_API_TOKEN;
  if (!token) return null;
  const origin = request.headers.get("origin");
  if (request.method !== "GET" && origin && origin !== request.nextUrl.origin) return null;
  return token;
}

async function forward(request: NextRequest, path: string[]) {
  const token = authorized(request);
  if (!token) return NextResponse.json({ error: "Analyst API is not configured or request origin is invalid" }, { status: 503 });
  const root = path[0];
  if (!ALLOWED.has(root)) return NextResponse.json({ error: "Route not available" }, { status: 404 });

  const url = engineUrl(path);
  request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));
  const headers: HeadersInit = { Accept: "application/json", Authorization: `Bearer ${token}` };
  const tenant = process.env.THREATFADE_API_TENANT;
  if (tenant) headers["X-Tenant-ID"] = tenant;

  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const raw = await request.arrayBuffer();
    if (raw.byteLength > MAX_BODY) return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    body = new TextDecoder().decode(raw);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, { method: request.method, headers, body, redirect: "error", cache: "no-store" });
  const payload = await response.arrayBuffer();
  if (payload.byteLength > MAX_BODY) return NextResponse.json({ error: "Upstream response too large" }, { status: 502 });
  const output = new NextResponse(payload, { status: response.status });
  output.headers.set("Content-Type", response.headers.get("content-type") ?? "application/json");
  const requestId = response.headers.get("x-request-id");
  if (requestId) output.headers.set("X-Request-ID", requestId);
  return output;
}

export async function GET(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}

export async function POST(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  return forward(request, (await context.params).path);
}
