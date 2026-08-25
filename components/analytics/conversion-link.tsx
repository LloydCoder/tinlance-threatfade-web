"use client";

import type { ReactNode } from "react";

export type ConversionEvent =
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

export function ConversionLink({
  href,
  event,
  children,
  className,
  target,
  rel,
  source = "enterprise",
}: {
  href: string;
  event: ConversionEvent;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  source?: string;
}) {
  function handleClick() {
    const detail = {
      name: event,
      source,
      timestamp: Date.now(),
    };
    window.dispatchEvent(new CustomEvent("threatfade:conversion", { detail }));
    const dataLayer = (
      window as Window & {
        dataLayer?: Array<Record<string, unknown>>;
      }
    ).dataLayer;
    dataLayer?.push({ event: "threatfade_conversion", ...detail });
  }

  return (
    <a
      href={href}
      className={className}
      target={target}
      rel={rel}
      onClick={handleClick}
      data-tf-event={event}
    >
      {children}
    </a>
  );
}
