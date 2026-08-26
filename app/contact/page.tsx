"use client";

import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";

const allowedTypes = new Set(["reference", "case-study", "research", "feedback"]);

export default function ContactPage() {
  const params = useSearchParams();
  const requested = params.get("type") ?? "feedback";
  const type = allowedTypes.has(requested) ? requested : "feedback";
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setStatus(null);
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/customer-value/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, message: String(form.get("message") ?? "") }),
    });
    const body = await response.json().catch(() => null);
    setBusy(false);
    setStatus(
      response.ok
        ? "Request received. We will review it and respond through the authenticated account contact."
        : body?.error ?? "Request could not be submitted.",
    );
    if (response.ok) setMessage("");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
        Customer request
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Share feedback or opt in to advocacy.
      </h1>
      <p className="mt-4 text-[var(--tf-text-muted)]">
        Requests are reviewed by the ThreatFade team. Nothing is published, used as a testimonial,
        or treated as a roadmap commitment without appropriate review and consent.
      </p>
      <form
        onSubmit={submit}
        className="mt-8 space-y-5 rounded-2xl border border-[var(--tf-border)] p-6"
      >
        <label className="block text-sm font-medium">
          Request type
          <input value={type} readOnly className="mt-2 block w-full rounded-lg border p-3" />
        </label>
        <label className="block text-sm font-medium">
          Message
          <textarea
            name="message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            minLength={10}
            maxLength={2000}
            rows={7}
            className="mt-2 block w-full rounded-lg border p-3"
          />
        </label>
        <button
          disabled={busy}
          type="submit"
          className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {busy ? "Sending…" : "Submit request"}
        </button>
        {status && (
          <p role="status" className="text-sm text-[var(--tf-text-muted)]">
            {status}
          </p>
        )}
      </form>
    </main>
  );
}
