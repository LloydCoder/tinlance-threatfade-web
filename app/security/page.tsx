import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TrustBoundary } from "@/components/marketing/core-experience";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import truth from "@/content/engine-truth.json";

export const metadata: Metadata = {
  title: "Security & Trust",
  description:
    "ThreatFade security architecture, identity, authorization, tenant isolation, evidence integrity, offline transport and supply-chain controls.",
  alternates: { canonical: "/security" },
  openGraph: {
    title: "ThreatFade Security & Trust",
    description: "Engineering security controls and explicit assurance boundaries for ThreatFade.",
    url: "/security",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreatFade Security & Trust",
    description: "Engineering security controls and explicit assurance boundaries for ThreatFade.",
  },
};

const controls = [
  [
    "Identity & authentication",
    "OIDC/JWT validation with issuer, audience, JWKS and time-claim validation; protected deployments depend on a configured identity provider.",
  ],
  [
    "Authorization & tenancy",
    "RBAC, server-side tenant authority, tenant-scoped persistence and default-deny cross-tenant boundaries are tested in the repository.",
  ],
  [
    "Evidence integrity",
    "ThreatFade preserves detection provenance and implements signed/replay-safe evidence transport and offline evidence packaging. Cryptographic integrity is not the same as proving sensor truth or causality.",
  ],
  [
    "Offline / store-and-forward",
    "The transport is bounded: local durable buffering, finite retry, idempotency and signed batches support degraded connectivity without implying unlimited offline operation.",
  ],
  [
    "Input security",
    "PCAP/network inputs are treated as untrusted data with validation, bounded processing, request limits, rate controls and safe temporary-file handling.",
  ],
  [
    "Supply chain",
    "The repository contains dependency/security scanning, SBOM, provenance/attestation, artifact signing and container-hardening gates.",
  ],
] as const;

const statusRows = [
  ["Authentication", truth.security.authentication],
  ["Authorization", truth.security.authorization],
  ["Tenant isolation", truth.security.tenantIsolation],
  ["Audit logging", truth.security.auditLogging],
  ["Evidence integrity", truth.security.evidenceIntegrity],
  ["Offline/store-and-forward", truth.security.offlineStoreAndForward],
  ["Dependency scanning", truth.security.dependencyScanning],
  ["SBOM", truth.security.SBOM],
  ["Container hardening", truth.security.containerHardening],
  ["Formal certification", truth.security.formalCertification],
] as const;

export default function SecurityPage() {
  return (
    <PageShell
      eyebrow="Security & Trust"
      title="Security controls, trust boundaries and explicit non-claims."
      description="ThreatFade publishes the engineering model behind its security controls and separates implemented controls from external assurance."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {controls.map(([title, body]) => (
          <TfPanel key={title} className="p-6">
            <TfBadge tone="signal">Control</TfBadge>
            <h2 className="mt-5 font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p>
          </TfPanel>
        ))}
      </div>

      <div className="mt-8">
        <TrustBoundary />
      </div>

      <TfPanel className="mt-8 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="tf-mono-label text-[var(--tf-signal)]">Security status matrix</span>
            <h2 className="mt-3 text-xl font-semibold">Current engineering posture</h2>
          </div>
          <TfBadge tone="neutral">v{truth.version}</TfBadge>
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[34rem] text-left text-sm">
            <thead className="border-b border-[var(--tf-line)] text-xs text-[var(--tf-text-subtle)]">
              <tr>
                <th className="py-3 pr-4">Area</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {statusRows.map(([area, status]) => (
                <tr key={area} className="border-b border-[var(--tf-line)] last:border-0">
                  <td className="py-3 pr-4 font-medium">{area}</td>
                  <td className="py-3">
                    <TfBadge tone={status === "NOT-CLAIMED" ? "neutral" : "signal"}>
                      {status}
                    </TfBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TfPanel>

      <TfPanel className="mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Security standards reference</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          ThreatFade uses OWASP ASVS 5.0.0 as an application-security verification baseline and is
          informed by NIST CSF 2.0 for cybersecurity risk management. These are engineering
          references, not certification or compliance claims. AI/agent-specific OWASP guidance is
          relevant only where an actual AI/agent component exists; the deterministic detection
          engine is not presented as an autonomous AI agent.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-sm">
          <Link
            href="https://owasp.org/www-project-application-security-verification-standard/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--tf-signal)]"
          >
            OWASP ASVS 5.0.0 →
          </Link>
          <Link
            href="https://www.nist.gov/cyberframework"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--tf-signal)]"
          >
            NIST CSF 2.0 →
          </Link>
          <Link
            href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--tf-signal)]"
          >
            OWASP Agentic guidance →
          </Link>
        </div>
      </TfPanel>

      <TfPanel className="mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Responsible disclosure</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          Security vulnerabilities should be reported through the repository&apos;s published
          security contact and disclosure mechanism. Do not send secrets, credentials or sensitive
          customer data in public issues.
        </p>
        <Link
          href="https://github.com/LloydCoder/tinlance-threatfade/security"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex text-sm font-semibold text-[var(--tf-signal)]"
        >
          Open repository security page →
        </Link>
      </TfPanel>

      <TfPanel className="mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">What this does not prove</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          ThreatFade does not claim SOC 2, ISO 27001, Common Criteria, regulatory approval,
          third-party penetration testing, independent detection validation, contractual SLAs,
          customer-scale performance guarantees or universal security outcomes. Those require
          separate operational and independent evidence.
        </p>
      </TfPanel>
    </PageShell>
  );
}
