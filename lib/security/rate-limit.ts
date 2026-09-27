import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import type { NextRequest } from "next/server";

type LimitConfig = {
  namespace: string;
  requests: number;
  window: `${number} s` | `${number} m` | `${number} h`;
};

const localBuckets = new Map<string, { count: number; resetAt: number }>();

function trustedClientId(request: NextRequest): string {
  const trustProxy = process.env.THREATFADE_TRUST_PROXY_HEADERS === "true";
  if (trustProxy) {
    return (
      request.headers.get("x-real-ip") ??
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      "unknown"
    );
  }
  return "untrusted-client";
}

function distributedLimiter(config: LimitConfig) {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(config.requests, config.window),
    analytics: true,
    prefix: `threatfade:${config.namespace}`,
  });
}

export async function allowRequest(
  request: NextRequest,
  config: LimitConfig,
): Promise<boolean> {
  const identifier = trustedClientId(request);
  const limiter = distributedLimiter(config);
  if (limiter) {
    const result = await limiter.limit(identifier);
    return result.success;
  }
  if (
    process.env.NODE_ENV === "production" &&
    process.env.THREATFADE_ALLOW_LOCAL_RATE_LIMIT !== "true"
  ) {
    throw new Error("Distributed rate limiting is not configured");
  }
  const now = Date.now();
  const key = `${config.namespace}:${identifier}`;
  const current = localBuckets.get(key);
  const match = /^(\\d+) ([smh])$/.exec(config.window);
  if (!match) throw new Error("invalid rate-limit window");
  const windowMs =
    Number(match[1]) *
    ({ s: 1000, m: 60_000, h: 3_600_000 } as const)[
      match[2] as "s" | "m" | "h"
    ];
  if (!current || current.resetAt <= now) {
    localBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (current.count >= config.requests) return false;
  current.count += 1;
  return true;
}
