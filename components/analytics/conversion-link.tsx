"use client";

import type { ReactNode } from "react";
import { trackConversion } from "@/components/analytics/conversion-tracker";
import type { ConversionEvent as CanonicalConversionEvent } from "@/lib/analytics/taxonomy";

export type LegacyConversionEvent =
  | "run_playground"
  | "view_github"
  | "read_docs"
  | "github_view"
  | "read_docs"
  | "explore_research"
  | "request_evaluation"
  | "contact_threatfade"
  | "view_pricing"
  | "request_assessment"
  | "request_pilot"
  | "request_enterprise"
  | "request_managed"
  | "request_custom_detection"
  | "request_research";

export type ConversionEvent = LegacyConversionEvent | CanonicalConversionEvent;

const eventMap: Partial<Record<LegacyConversionEvent, CanonicalConversionEvent>> = {
  run_playground: "playground_start",
  view_github: "github_view",
  read_docs: "docs_start",
  explore_research: "research_open",
  request_evaluation: "evaluation_request",
  contact_threatfade: "evaluation_request",
  view_pricing: "page_view",
  request_assessment: "assessment_request",
  request_pilot: "pilot_request",
  request_enterprise: "enterprise_request",
  request_managed: "enterprise_request",
  request_custom_detection: "enterprise_request",
  request_research: "enterprise_request",
};

function canonicalEvent(event: ConversionEvent): CanonicalConversionEvent {
  return eventMap[event as LegacyConversionEvent] ?? (event as CanonicalConversionEvent);
}

export function ConversionLink({ href, event, children, className, target, rel, source = "site", cta }: { href: string; event: ConversionEvent; children: ReactNode; className?: string; target?: string; rel?: string; source?: string; cta?: string }) {
  function handleClick() {
    const name = canonicalEvent(event);
    trackConversion(name, { source, cta: cta ?? event });
    const detail = { name, source, cta: cta ?? event, timestamp: Date.now() };
    window.dispatchEvent(new CustomEvent("threatfade:conversion", { detail }));
    const dataLayer = (window as Window & { dataLayer?: Array<Record<string, unknown>> }).dataLayer;
    dataLayer?.push({ event: "threatfade_conversion", ...detail });
  }

  return <a href={href} className={className} target={target} rel={rel} onClick={handleClick} data-tf-event={canonicalEvent(event)}>{children}</a>;
}
