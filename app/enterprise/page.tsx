import type { Metadata } from "next";
import Link from "next/link";
import { ConversionLink } from "@/components/analytics/conversion-link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

export const metadata: Metadata = {
  title: "Enterprise evaluation",
  description:
    "Evaluate ThreatFade as an evidence-first detection layer for behavioral fading workflows.",
  alternates: { canonical: "/enterprise" },
};

const audiences = [
  [
    "SOC leaders",
    "Assess behavioral-fade evidence for prioritization and investigation without replacing your existing SIEM/SOAR.",
  ],
  [
    "Security architects",
    "Review identity, tenancy, control-plane, detection-plane, persistence and interoperability boundaries.",
  ],
  [
    "Security engineering",
    "Inspect detection packs, evidence structures, validation tooling and export paths.",
  ],
  [
    "Platform teams",
    "Evaluate deployment, health/readiness, identity configuration and PostgreSQL persistence.",
  ],
  [
    "Research organizations",
    "Use documented methodology, deterministic benchmarks and explicit evidence boundaries.",
  ],
  [
    "Qualified buyers",
    "Start with a scoped technical evaluation rather than a generic sales demo.",
  ],
] as const;

export default function EnterprisePage() {
  return (
    <PageShell
      eyebrow="Enterprise evaluation"
      title="Evaluate the detection layer. Keep your existing security stack."
      description="ThreatFade sits between observed signals and the operational systems that investigate them. Enterprise evaluation starts with architecture, evidence and deployment boundaries—not a feature checklist."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {audiences.map(([title, body]) => (
          <TfPanel key={title} className="p-6">
            <TfBadge tone="neutral">{title}</TfBadge>
            <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p>
          </TfPanel>
        ))}
      </div>
      <section className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <TfPanel raised className="p-6 sm:p-8">
          <TfBadge tone="signal">Operational model</TfBadge>
          <h2 className="mt-4 text-2xl font-semibold">
            Prioritize → Inspect → Pivot → Disposition → Handoff
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">
            ThreatFade produces structured detection evidence and context for analyst workflows. It
            can persist tenant-scoped records and expose documented interoperable outputs.
          </p>
        </TfPanel>
        <TfPanel className="p-6 sm:p-8">
          <TfBadge tone="neutral">Evaluation path</TfBadge>
          <ol className="mt-5 space-y-5 text-sm text-[var(--tf-text-muted)]">
            <li>
              <strong className="text-[var(--tf-text)]">01 · Read</strong>
              <br />
              Architecture, security and documentation.
            </li>
            <li>
              <strong className="text-[var(--tf-text)]">02 · Run</strong>
              <br />
              Start locally or inspect the curated playground.
            </li>
            <li>
              <strong className="text-[var(--tf-text)]">03 · Scope</strong>
              <br />
              Select a detection scenario and evidence question.
            </li>
            <li>
              <strong className="text-[var(--tf-text)]">04 · Evaluate</strong>
              <br />
              Compare against your own operational acceptance criteria.
            </li>
          </ol>
        </TfPanel>
      </section>
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Architecture", "/how-it-works", "Understand the control and detection planes."],
          ["Security", "/security", "Review implemented controls and explicit assurance limits."],
          ["Interoperability", "/integrations", "See documented export and integration paths."],
        ].map(([title, href, body]) => (
          <Link
            key={href}
            href={href}
            className="tf-panel p-6 transition hover:-translate-y-0.5 hover:border-[var(--tf-signal)]"
          >
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">{body}</p>
          </Link>
        ))}
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <ConversionLink
          className="tf-button tf-button-primary"
          href="/docs/getting-started"
          event="read_docs"
        >
          Read documentation
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="https://github.com/LloydCoder/tinlance-threatfade"
          event="view_github"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="mailto:hello@tinlance.com?subject=ThreatFade%20evaluation"
          event="request_evaluation"
        >
          Request evaluation
        </ConversionLink>
      </div>
    </PageShell>
  );
}
