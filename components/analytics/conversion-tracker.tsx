"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ConversionEvent } from "@/lib/analytics/taxonomy";

const ATTRIBUTION_KEY = "threatfade_attribution_v1";
const attributionKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content"] as const;

type Attribution = Partial<Record<(typeof attributionKeys)[number], string>> & {
  landing_page?: string;
};

function clean(value: string | null, max = 160) {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

function readAttribution(): Attribution {
  try {
    const stored = JSON.parse(window.localStorage.getItem(ATTRIBUTION_KEY) ?? "null") as Attribution | null;
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function persistAttribution(searchParams: URLSearchParams, path: string) {
  const current = readAttribution();
  let changed = false;
  for (const key of attributionKeys) {
    const value = clean(searchParams.get(key));
    if (value && !current[key]) {
      current[key] = value;
      changed = true;
    }
  }
  if (!current.landing_page) {
    current.landing_page = path.slice(0, 512);
    changed = true;
  }
  if (changed) {
    try {
      window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(current));
    } catch {
      // Attribution is optional and never blocks the product journey.
    }
  }
  return current;
}

export function trackConversion(
  name: ConversionEvent,
  options: { source?: string; cta?: string; value?: Record<string, string | number | boolean> } = {},
) {
  if (typeof window === "undefined") return;
  const attribution = readAttribution();
  const payload = {
    name,
    path: window.location.pathname,
    source: clean(options.source ?? null),
    cta: clean(options.cta ?? null),
    landing_page: clean(attribution.landing_page ?? null, 512),
    referrer: clean(document.referrer || null, 2048),
    utm_source: clean(attribution.utm_source ?? null),
    utm_medium: clean(attribution.utm_medium ?? null),
    utm_campaign: clean(attribution.utm_campaign ?? null),
    utm_content: clean(attribution.utm_content ?? null),
    value: options.value,
  };

  const body = JSON.stringify(payload);
  try {
    if (navigator.sendBeacon) {
      const sent = navigator.sendBeacon(
        "/api/analytics/event",
        new Blob([body], { type: "application/json" }),
      );
      if (sent) return;
    }
  } catch {
    // Fall through to keepalive fetch.
  }

  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
    credentials: "same-origin",
  }).catch(() => undefined);
}

export function ConversionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const firstRender = useRef(true);

  useEffect(() => {
    const attribution = persistAttribution(searchParams, pathname);
    if (firstRender.current) {
      firstRender.current = false;
      trackConversion("page_view", { source: "site", value: { has_attribution: Boolean(Object.keys(attribution).length) } });
      return;
    }
    trackConversion("page_view", { source: "navigation" });
  }, [pathname, searchParams]);

  return null;
}
