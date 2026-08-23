"use client";

import type { ReactNode } from "react";

export type ConversionEvent =
  | "run_playground"
  | "view_github"
  | "read_docs"
  | "explore_research"
  | "request_evaluation"
  | "contact_threatfade";

export function ConversionLink({
  href,
  event,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  event: ConversionEvent;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}) {
  function handleClick() {
    const detail = {
      name: event,
      source: "enterprise",
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
