"use client";

import type { ReactNode } from "react";
import { trackConversion } from "@/components/analytics/conversion-tracker";
import type { ConversionEvent as CanonicalConversionEvent } from "@/lib/analytics/taxonomy";

export type LegacyConversionEvent =
  | "run_playground"
  | "view_github"
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
  run_playground: "cta_click",
  view_github: "github_view",
  read_docs: "docs_start",
  explore_research: "research_open",
  request_evaluation: "cta_click",
  contact_threatfade: "cta_click",
  view_pricing: "page_view",
  request_assessment: "cta_click",
  request_pilot: "cta_click",
  request_enterprise: "cta_click",
  request_managed: "cta_click",
  request_custom_detection: "cta_click",
  request_research: "cta_click",
};

function canonicalEvent(event: ConversionEvent): CanonicalConversionEvent {
  return eventMap[event as LegacyConversionEvent] ?? (event as CanonicalConversionEvent);
}

export function ConversionLink({
  href,
  event,
  children,
  className,
  target,
  rel,
  source = "site",
  cta,
}: {
  href: string;
  event: ConversionEvent;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  source?: string;
  cta?: string;
}) {
  function handleClick() {
    trackConversion(canonicalEvent(event), { source, cta: cta ?? event });
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      data-tf-event={canonicalEvent(event)}
    >
      {children}
    </a>
  );
}
