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
      eyebrow="Enterprise evaluation · from $25,000/year"
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

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <TfPanel raised className="p-6 sm:p-8">
          <TfBadge tone="signal">Commercial model</TfBadge>
          <h2 className="mt-4 text-2xl font-semibold">
            Annual platform commitment, scoped to operational value.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">
            Enterprise pricing starts at $25,000/year. Final scope reflects deployment topology,
            analysis requirements, integrations, governance, support and security requirements
            rather than arbitrary seat counts.
          </p>
        </TfPanel>
        <TfPanel className="p-6 sm:p-8">
          <TfBadge tone="neutral">High-intent path</TfBadge>
          <ol className="mt-5 space-y-5 text-sm text-[var(--tf-text-muted)]">
            <li>
              <strong className="text-[var(--tf-text)]">01 · Assess</strong>
              <br />
              Find evidence-backed detection gaps.
            </li>
            <li>
              <strong className="text-[var(--tf-text)]">02 · Pilot</strong>
              <br />
              Validate the capability against agreed success criteria.
            </li>
            <li>
              <strong className="text-[var(--tf-text)]">03 · Enterprise</strong>
              <br />
              Operationalize the capability under a defined commercial scope.
            </li>
          </ol>
        </TfPanel>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <Link
          href="/how-it-works"
          className="tf-panel p-6 transition hover:-translate-y-0.5 hover:border-[var(--tf-signal)]"
        >
          <h2 className="font-semibold">Architecture</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            Understand the control and detection planes.
          </p>
        </Link>
        <Link
          href="/security"
          className="tf-panel p-6 transition hover:-translate-y-0.5 hover:border-[var(--tf-signal)]"
        >
          <h2 className="font-semibold">Security</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            Review implemented controls and explicit assurance limits.
          </p>
        </Link>
        <Link
          href="/integrations"
          className="tf-panel p-6 transition hover:-translate-y-0.5 hover:border-[var(--tf-signal)]"
        >
          <h2 className="font-semibold">Interoperability</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            See documented export and integration paths.
          </p>
        </Link>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <ConversionLink
          className="tf-button tf-button-primary"
          href="/assessment"
          event="request_assessment"
          source="enterprise"
        >
          Start with an assessment
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="/pilot"
          event="request_pilot"
          source="enterprise"
        >
          Scope a pilot
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="/managed"
          event="request_managed"
          source="enterprise"
        >
          Managed option
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="/pricing"
          event="view_pricing"
          source="enterprise"
        >
          View pricing
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="/docs/getting-started"
          event="read_docs"
          source="enterprise"
        >
          Read documentation
        </ConversionLink>
        <ConversionLink
          className="tf-button"
          href="https://github.com/LloydCoder/tinlance-threatfade"
          event="view_github"
          source="enterprise"
          target="_blank"
          rel="noreferrer"
        >
          View on GitHub
        </ConversionLink>
      </div>
    </PageShell>
  );
}
