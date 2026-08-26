"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getExpansionSignals,
  getMilestones,
  healthLabel,
  type CustomerSnapshot,
} from "@/lib/customer-value/model";

type DetectionResponse = { items?: unknown[]; total?: number; detections?: unknown[] };
type Organization = { id?: string; name?: string; role?: string };

function countFrom(payload: DetectionResponse | null) {
  if (!payload) return 0;
  if (typeof payload.total === "number") return Math.max(0, payload.total);
  if (Array.isArray(payload.items)) return payload.items.length;
  if (Array.isArray(payload.detections)) return payload.detections.length;
  return 0;
}

function memberCount(payload: unknown) {
  if (Array.isArray(payload)) return payload.length;
  if (
    typeof payload === "object" &&
    payload &&
    "items" in payload &&
    Array.isArray(payload.items)
  ) {
    return payload.items.length;
  }
  return 0;
}

export default function CustomerValuePage() {
  const { data: session, status } = useSession();
  const [snapshot, setSnapshot] = useState<CustomerSnapshot>({
    detectionCount: 0,
    investigationCount: 0,
    dispositionCount: 0,
    activeMembers: 0,
    environmentCount: 1,
    integrationRequestCount: 0,
    customDetectionRequestCount: 0,
  });
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [detectionsResponse, orgResponse] = await Promise.all([
          fetch("/api/analyst/inbox?limit=100", { cache: "no-store" }),
          fetch("/api/identity/organizations", { cache: "no-store" }),
        ]);
        if (!detectionsResponse.ok) throw new Error("Customer detection data unavailable");
        const detections = (await detectionsResponse.json()) as DetectionResponse;
        let organizations: Organization[] = [];
        if (orgResponse.ok) {
          const body = (await orgResponse.json()) as { items?: Organization[] } | Organization[];
          organizations = Array.isArray(body) ? body : (body.items ?? []);
        }
        const current = organizations[0] ?? null;
        let members = 0;
        if (current?.id && /^[0-9a-f]{32}$/.test(current.id)) {
          const membersResponse = await fetch(`/api/identity/organizations/${current.id}/members`, {
            cache: "no-store",
          });
          if (membersResponse.ok) members = memberCount(await membersResponse.json());
        }
        if (cancelled) return;
        setOrganization(current);
        setSnapshot((previous) => ({
          ...previous,
          detectionCount: countFrom(detections),
          activeMembers: members,
        }));
      } catch (cause) {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Customer data unavailable");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [status]);

  const milestones = useMemo(() => getMilestones(snapshot), [snapshot]);
  const expansionSignals = useMemo(() => getExpansionSignals(snapshot), [snapshot]);

  if (status === "loading" || loading) {
    return <main className="mx-auto max-w-6xl px-6 py-16">Loading customer workspace…</main>;
  }
  if (!session) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p role="alert">Sign in required.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">
          Customer value
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          {organization?.name ?? "Organization workspace"}
        </h1>
        <p className="mt-3 max-w-3xl text-[var(--tf-text-muted)]">
          Adoption, operational health, and expansion signals derived from product activity. Signals
          prioritize a human review; they never create an automatic upgrade or sales decision.
        </p>
      </header>

      {error && (
        <p role="alert" className="mt-6 rounded-xl border border-red-300/50 p-4 text-sm">
          {error}
        </p>
      )}

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Detections", snapshot.detectionCount],
          ["Investigations", snapshot.investigationCount],
          ["Dispositions", snapshot.dispositionCount],
          ["Team members", snapshot.activeMembers],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl border border-[var(--tf-border)] p-5">
            <p className="text-sm text-[var(--tf-text-muted)]">{label}</p>
            <p className="mt-2 text-3xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-[var(--tf-border)] p-6">
          <h2 className="text-xl font-semibold">Activation & success milestones</h2>
          <div className="mt-5 space-y-3">
            {milestones.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 rounded-xl border border-[var(--tf-border)] p-4"
              >
                <span
                  aria-hidden
                  className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ${item.complete ? "bg-emerald-500" : "bg-slate-300"}`}
                />
                <div>
                  <p className="font-medium">{item.label}</p>
                  <p className="mt-1 text-sm text-[var(--tf-text-muted)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--tf-border)] p-6">
          <p className="text-sm text-[var(--tf-text-muted)]">Workspace health</p>
          <p className="mt-2 text-2xl font-semibold">{healthLabel(snapshot)}</p>
          <p className="mt-3 text-sm text-[var(--tf-text-muted)]">
            Retention, churn and NRR require longitudinal billing/product cohorts; they are not
            fabricated from a point-in-time snapshot.
          </p>
          <div className="mt-6 grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>Retention</span>
              <span>Longitudinal data required</span>
            </div>
            <div className="flex justify-between">
              <span>Churn</span>
              <span>Billing cohort required</span>
            </div>
            <div className="flex justify-between">
              <span>NRR</span>
              <span>Revenue cohort required</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-[var(--tf-border)] p-6">
        <h2 className="text-xl font-semibold">Expansion signals</h2>
        <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
          No automatic upsell is triggered. Validate the underlying customer need before
          recommending a plan change.
        </p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {expansionSignals.length ? (
            expansionSignals.map((signal) => (
              <article key={signal.id} className="rounded-xl border border-[var(--tf-border)] p-4">
                <p className="font-medium">{signal.label}</p>
                <p className="mt-1 text-sm text-[var(--tf-text-muted)]">{signal.rationale}</p>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-dashed border-[var(--tf-border)] p-4 text-sm text-[var(--tf-text-muted)]">
              No expansion signal is currently evidenced by the available workspace data.
            </p>
          )}
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-4">
        {["Team", "Enterprise", "Managed", "Custom Detection"].map((plan) => (
          <a
            key={plan}
            href={`/pricing#${plan.toLowerCase().replaceAll(" ", "-")}`}
            className="rounded-xl border border-[var(--tf-border)] p-4 text-sm font-semibold hover:border-slate-400"
          >
            Review {plan} path →
          </a>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-[var(--tf-border)] p-6">
        <h2 className="text-xl font-semibold">Customer advocacy & product feedback</h2>
        <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
          References, case studies, testimonials and research collaboration are opt-in. Product
          feedback is treated as input to validation, not as an automatic roadmap commitment.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="/contact?type=reference"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Offer a reference
          </a>
          <a
            href="/contact?type=case-study"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Discuss a case study
          </a>
          <a
            href="/contact?type=research"
            className="rounded-lg border px-4 py-2 text-sm font-medium"
          >
            Research collaboration
          </a>
          <a
            href="/contact?type=feedback"
            className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-medium text-white"
          >
            Send product feedback
          </a>
        </div>
      </section>
    </main>
  );
}
