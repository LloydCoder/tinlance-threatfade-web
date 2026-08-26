import { cookies } from "next/headers";
import { randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { analyticsProvider } from "@/lib/analytics/provider";
import { type ConversionEvent } from "@/lib/analytics/taxonomy";

const ANON_COOKIE = "tf_anon_id";

export async function trackServerEvent(event: ConversionEvent, request?: NextRequest) {
  const cookieStore = await cookies();
  let distinctId = cookieStore.get(ANON_COOKIE)?.value;
  if (!distinctId || !/^[0-9a-f-]{36}$/i.test(distinctId)) distinctId = randomUUID();

  const url = request?.url ? new URL(request.url) : null;
  await analyticsProvider.capture(
    {
      name: event,
      path: url?.pathname ?? "/",
      source: "server",
      landing_page: undefined,
      referrer: request?.headers.get("referer") ?? undefined,
    },
    { distinctId, receivedAt: new Date().toISOString() },
  );
}
