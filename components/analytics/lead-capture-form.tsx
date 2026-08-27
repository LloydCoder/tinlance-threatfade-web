"use client";

import { useState, type FormEvent } from "react";
import { trackConversion } from "@/components/analytics/conversion-tracker";
import type { ConversionEvent } from "@/lib/analytics/taxonomy";

export function LeadCaptureForm({
  requestType,
  event,
  fallbackHref,
}: {
  requestType: "assessment" | "pilot" | "enterprise";
  event: ConversionEvent;
  fallbackHref: string;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function submit(eventObject: FormEvent<HTMLFormElement>) {
    eventObject.preventDefault();
    if (status === "submitting") return;
    const formElement = eventObject.currentTarget;
    const form = new FormData(formElement);
    setStatus("submitting");
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          request_type: requestType,
          email: form.get("email"),
          company: form.get("company"),
          role: form.get("role"),
          notes: form.get("notes"),
          website: form.get("website"),
        }),
      });
      if (!response.ok) throw new Error("lead capture failed");
      trackConversion(event, { source: requestType, cta: "lead_form_complete" });
      setStatus("success");
      formElement.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-[var(--tf-line)] bg-[var(--tf-surface)] p-6 sm:p-8">
      <div className="mb-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--tf-text-subtle)]">
          Technical intake
        </p>
        <h2 className="mt-2 text-xl font-semibold">Start the {requestType} conversation</h2>
        <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
          Minimal qualification only. Security telemetry, credentials and sensitive incident details
          are not requested here.
        </p>
      </div>
      <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className="tf-input mt-2 w-full"
          />
        </label>
        <label className="text-sm">
          Company
          <input
            name="company"
            autoComplete="organization"
            required
            maxLength={160}
            className="tf-input mt-2 w-full"
          />
        </label>
        <label className="text-sm">
          Role
          <input
            name="role"
            autoComplete="organization-title"
            required
            maxLength={120}
            className="tf-input mt-2 w-full"
          />
        </label>
        <label className="hidden" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <label className="text-sm md:col-span-2">
          What are you evaluating?
          <textarea name="notes" rows={4} maxLength={1200} className="tf-input mt-2 w-full" />
        </label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="tf-button tf-button-primary disabled:opacity-60"
          >
            {status === "submitting" ? "Sending…" : "Submit technical request"}
          </button>
          <a className="text-sm underline underline-offset-4" href={fallbackHref}>
            Use email instead
          </a>
        </div>
        {status === "success" ? (
          <p role="status" className="text-sm text-[var(--tf-signal)] md:col-span-2">
            Request received. The next step is a technical qualification response.
          </p>
        ) : null}
        {status === "error" ? (
          <p role="alert" className="text-sm text-[var(--tf-danger)] md:col-span-2">
            The intake service is temporarily unavailable. Use the email fallback above.
          </p>
        ) : null}
      </form>
    </div>
  );
}
