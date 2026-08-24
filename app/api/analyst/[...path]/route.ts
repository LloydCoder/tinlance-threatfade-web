import { NextRequest, NextResponse } from "next/server";

const MAX_BODY = 1_048_576;
const DETECTION_ACTIONS = new Set([
  "timeline",
  "entities",
  "sessions",
  "workflow",
  "cases",
  "disposition",
]);

function engineUrl(path: string[]) {
  const base = process.env.THREATFADE_API_URL;
  if (!base) throw new Error("THREATFADE_API_URL is not configured");
  const parsed = new URL(base);
  if (parsed.protocol !== "https:" && process.env.NODE_ENV === "production") {
    throw new Error("ThreatFade API must use HTTPS in production");
  }
  return new URL(`/enterprise/analyst/${path.join("/")}`, `${base.replace(/\/$/, "")}/`);
}

function validPath(path: string[]) {
  if (path.length === 1 && path[0] === "inbox") return true;
  if (path.length === 2 && path[0] === "detections" && /^\d+$/.test(path[1])) return true;
  return (
    path.length === 3 &&
    path[0] === "detections" &&
    /^\d+$/.test(path[1]) &&
    DETECTION_ACTIONS.has(path[2])
  );
}

function authorizationHeader(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (request.method !== "GET" && origin && origin !== request.nextUrl.origin) return null;
  const incoming = request.headers.get("authorization");
  if (incoming?.startsWith("Bearer ")) return incoming;

  // Explicit service mode is intended for a single-tenant deployment protected
  // by an upstream SSO/network boundary. It is disabled by default. In normal
  // multi-user deployments the originating consumer token is forwarded so the
  // engine makes the final authorization decision for that subject.
  if (process.env.THREATFADE_SOC_SERVICE_MODE === "true") {
    const token = process.env.THREATFADE_API_TOKEN;
    if (token) return `Bearer ${token}`;
  }
  return null;
}

async function forward(request: NextRequest, path: string[]) {
  if (!validPath(path)) {
    return NextResponse.json({ error: "Route not available" }, { status: 404 });
  }
  const authorization = authorizationHeader(request);
  if (!authorization) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let url: URL;
  try {
    url = engineUrl(path);
  } catch {
    return NextResponse.json({ error: "Analyst API is not configured securely" }, { status: 503 });
  }
  request.nextUrl.searchParams.forEach((value, key) => url.searchParams.set(key, value));
  const headers: HeadersInit = { Accept: "application/json", Authorization: authorization };

  // Never accept tenant identity from a browser header. The engine derives the
  // authoritative tenant from the authenticated consumer token.
  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    const raw = await request.arrayBuffer();
    if (raw.byteLength > MAX_BODY) {
      return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    }
    body = new TextDecoder().decode(raw);
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
    redirect: "error",
    cache: "no-store",
  });
  const payload = await response.arrayBuffer();
  if (payload.byteLength > MAX_BODY) {
    return NextResponse.json({ error: "Upstream response too large" }, { status: 502 });
  }
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forward(request, (await context.params).path);
}
