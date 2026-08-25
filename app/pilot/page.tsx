import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { ConversionLink } from "@/components/analytics/conversion-link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

export const metadata: Metadata = {
  title: "ThreatFade paid pilot",
  description:
    "A bounded 30–60 day ThreatFade pilot with explicit detection, evidence and operational success criteria.",
  alternates: { canonical: "/pilot" },
};
const criteria = [
  "Representative telemetry and agreed detection scenarios are in scope.",
  "Detection packs are deployed and their evidence output is reviewed.",
  "False-positive behavior is characterized rather than hidden.",
  "Evidence quality and analyst workflow are evaluated by the customer team.",
  "Required integration and deployment boundaries are validated.",
  "A written enterprise decision is made at the end of the pilot.",
] as const;

export default function PilotPage() {
  return (
    <PageShell
      eyebrow="Paid pilot · $7,500–$15,000"
      title="Prove the detection capability in your environment before scaling it."
      description="A bounded 30–60 day technical pilot designed around your data, detection question and acceptance criteria—not an open-ended trial."
    >
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <TfPanel raised className="p-6 sm:p-8">
          <TfBadge tone="signal">Pilot structure</TfBadge>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="font-medium">Scope</dt>
              <dd className="mt-1 text-[var(--tf-text-muted)]">
                One agreed environment or bounded deployment topology.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Duration</dt>
              <dd className="mt-1 text-[var(--tf-text-muted)]">Typically 30–60 days.</dd>
            </div>
            <div>
              <dt className="font-medium">Investment</dt>
              <dd className="mt-1 text-[var(--tf-text-muted)]">
                $7,500–$15,000 based on scope and engineering requirements.
              </dd>
            </div>
            <div>
              <dt className="font-medium">Commercial bridge</dt>
              <dd className="mt-1 text-[var(--tf-text-muted)]">
                Where agreed, the pilot fee is credited toward the first annual Enterprise contract.
              </dd>
            </div>
          </dl>
        </TfPanel>
        <TfPanel className="p-6 sm:p-8">
          <TfBadge tone="neutral">Success criteria</TfBadge>
          <div className="mt-6 space-y-4">
            {criteria.map((item) => (
              <div key={item} className="flex gap-3">
                <Check className="mt-0.5 size-4 shrink-0 text-[var(--tf-signal)]" />
                <p className="text-sm leading-7 text-[var(--tf-text-muted)]">{item}</p>
              </div>
            ))}
          </div>
        </TfPanel>
      </div>
      <section className="mt-10 grid gap-4 md:grid-cols-4">
        {["Define", "Deploy", "Measure", "Decide"].map((title, index) => (
          <TfPanel key={title} className="p-5">
            <div className="font-mono text-[10px] text-[var(--tf-text-subtle)]">0{index + 1}</div>
            <h2 className="mt-5 font-semibold">{title}</h2>
            <p className="mt-2 text-xs leading-6 text-[var(--tf-text-muted)]">
              {index === 0
                ? "Set objectives, data sources, baseline controls and the decision date."
                : index === 1
                  ? "Deploy the agreed ThreatFade boundary and validate operational prerequisites."
                  : index === 2
                    ? "Review detections, evidence, analyst workflow, latency and false-positive behavior."
                    : "Produce a quantified outcome and choose Enterprise, iterate, or stop."}
            </p>
          </TfPanel>
        ))}
      </section>
      <section className="mt-10 rounded-2xl border border-[color-mix(in_srgb,var(--tf-signal)_20%,var(--tf-line))] bg-[var(--tf-signal-soft)] p-7 sm:p-9">
        <TfBadge tone="signal">Conversion path</TfBadge>
        <h2 className="mt-4 text-2xl font-semibold">Assessment → Pilot → Enterprise</h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--tf-text-muted)]">
          The pilot is intentionally not a free proof-of-concept. It reserves engineering capacity,
          creates a shared acceptance framework and gives both sides an evidence-backed decision
          point.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ConversionLink
            href="mailto:hello@tinlance.com?subject=ThreatFade%20Paid%20Pilot"
            event="request_pilot"
            source="pilot"
            className="tf-button tf-button-primary"
          >
            Discuss a pilot
          </ConversionLink>
          <ConversionLink
            href="/enterprise"
            event="request_enterprise"
            source="pilot"
            className="tf-button"
          >
            Enterprise path <ArrowRight className="size-4" />
          </ConversionLink>
        </div>
      </section>
    </PageShell>
  );
}
