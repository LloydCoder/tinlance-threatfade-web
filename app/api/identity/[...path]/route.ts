import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const MAX_BODY = 1_048_576;
const TIMEOUT_MS = 8_000;
const ALLOWED = new Set([
  "me",
  "organizations",
  "sessions",
  "sessions/revoke",
  "sessions/revoke-all",
  "sessions/switch",
]);

function allowed(path: string[]) {
  if (path.length === 1 && ALLOWED.has(path[0])) return true;
  if (path.length === 2 && path[0] === "organizations" && /^[0-9a-f]{32}$/.test(path[1])) {
    return true;
  }
  if (
    path.length === 3 &&
    path[0] === "organizations" &&
    /^[0-9a-f]{32}$/.test(path[1]) &&
    ["members", "invitations"].includes(path[2])
  ) {
    return true;
  }
  if (
    path.length === 4 &&
    path[0] === "organizations" &&
    /^[0-9a-f]{32}$/.test(path[1]) &&
    path[2] === "members"
  ) {
    return true;
  }
  if (
    path.length === 5 &&
    path[0] === "organizations" &&
    /^[0-9a-f]{32}$/.test(path[1]) &&
    path[2] === "invitations" &&
    /^\d+$/.test(path[3]) &&
    path[4] === "revoke"
  ) {
    return true;
  }
  return path.length === 2 && path[0] === "invitations" && path[1] === "accept";
}

function sameOrigin(request: NextRequest) {
  if (request.method === "GET") return true;
  const origin = request.headers.get("origin");
  return Boolean(origin && origin === request.nextUrl.origin);
}

export async function forward(request: NextRequest, path: string[]) {
  if (!allowed(path)) return NextResponse.json({ error: "Route not available" }, { status: 404 });
  if (!sameOrigin(request))
    return NextResponse.json({ error: "Cross-origin mutation denied" }, { status: 403 });

  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret)
    return NextResponse.json({ error: "Authentication is not configured" }, { status: 503 });

  const token = await getToken({
    req: request,
    secret,
    cookieName: `${process.env.NODE_ENV === "production" ? "__Secure-" : ""}threatfade.session-token`,
  });
  const accessToken = typeof token?.access_token === "string" ? token.access_token : "";
  const sessionToken = typeof token?.tf_session === "string" ? token.tf_session : "";
  if (!accessToken || !sessionToken)
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });

  const base = process.env.THREATFADE_API_URL;
  if (!base) return NextResponse.json({ error: "Identity API is not configured" }, { status: 503 });
  try {
    const parsed = new URL(base);
    if (process.env.NODE_ENV === "production" && parsed.protocol !== "https:")
      return NextResponse.json({ error: "Identity API must use HTTPS" }, { status: 503 });
  } catch {
    return NextResponse.json({ error: "Identity API is not configured securely" }, { status: 503 });
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const raw = request.method === "GET" ? undefined : await request.arrayBuffer();
    if (raw && raw.byteLength > MAX_BODY)
      return NextResponse.json({ error: "Request body too large" }, { status: 413 });
    const body = raw ? new TextDecoder().decode(raw) : undefined;
    if (body) {
      try {
        JSON.parse(body);
      } catch {
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
      }
    }

    const url = new URL(`${base.replace(/\/$/, "")}/enterprise/identity/${path.join("/")}`);
    for (const [key, value] of request.nextUrl.searchParams) {
      if (key.length > 64 || value.length > 128)
        return NextResponse.json({ error: "Invalid query parameter" }, { status: 400 });
      url.searchParams.set(key, value);
    }

    const response = await fetch(url, {
      method: request.method,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "X-ThreatFade-Session": sessionToken,
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body,
      redirect: "error",
      cache: "no-store",
      signal: controller.signal,
    });
    const payload = await response.arrayBuffer();
    if (payload.byteLength > MAX_BODY)
      return NextResponse.json({ error: "Identity response too large" }, { status: 502 });

    const output = new NextResponse(payload, { status: response.status });
    output.headers.set("Content-Type", "application/json");
    output.headers.set("Cache-Control", "no-store");
    return output;
  } catch (error) {
    const aborted = error instanceof Error && error.name === "AbortError";
    return NextResponse.json(
      { error: aborted ? "Identity service timed out" : "Identity service unavailable" },
      { status: aborted ? 504 : 503 },
    );
  } finally {
    clearTimeout(timer);
  }
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

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return forward(request, (await context.params).path);
}
