import { NextRequest, NextResponse } from "next/server";
import { accountProfileSchema, scoreAccount } from "@/lib/demand-intelligence/model";
import { allowRequest } from "@/lib/security/rate-limit";

const MAX_BODY_BYTES = 24_000;
const buckets = new Map<string, { count: number; resetAt: number }>();

function trustedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  if (!request.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
  }
  if (!trustedOrigin(request)) {
    return NextResponse.json({ error: "Untrusted origin" }, { status: 403 });
  }
  if (!(await allowRequest(request, { namespace: "demand-score", requests: 20, window: "1 m" }))) {
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { "Retry-After": "60", "Cache-Control": "no-store" },
      },
    );
  }
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Request too large" }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = accountProfileSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid account profile" }, { status: 400 });
  }

  const result = scoreAccount(parsed.data);
  return NextResponse.json(
    { accountId: parsed.data.accountId, score: result },
    { status: 200, headers: { "Cache-Control": "no-store" } },
  );
}
