import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

export const metadata: Metadata = {
  title: "Enterprise procurement",
  description: "ThreatFade enterprise procurement and technical evaluation evidence index.",
  alternates: { canonical: "/enterprise/procurement" },
};

const questionnaire = [
  [
    "Architecture",
    "Control plane, detection plane, persistence, identity and deployment boundaries are documented in the architecture material.",
  ],
  [
    "Identity",
    "OIDC is implemented through the existing NextAuth/engine identity boundary. SAML is not represented as generally available.",
  ],
  [
    "Authorization",
    "Organization-scoped access and analyst boundaries are enforced through the existing authenticated product surface.",
  ],
  [
    "Data protection",
    "The product separates public marketing surfaces from authenticated/customer workflows and applies server-side input validation.",
  ],
  [
    "Operations",
    "Health/version boundaries and failure-safe API behavior are part of the web-to-engine integration contract.",
  ],
  [
    "Interoperability",
    "SIEM, SOAR, webhook and STIX adapter contracts are documented without claiming undeployed connectors.",
  ],
  [
    "Security response",
    "The public security policy provides the responsible disclosure path; incident handling remains deployment-specific.",
  ],
  ["Compliance", "No independent certification is claimed by this release."],
];

export default function EnterpriseProcurementPage() {
  return (
    <PageShell
      eyebrow="Enterprise procurement"
      title="A technical evaluation package for security and procurement teams."
      description="Use this index to evaluate architecture, identity, governance, interoperability and assurance boundaries before a pilot or commercial commitment."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {questionnaire.map(([title, body]) => (
          <TfPanel key={title} className="p-6">
            <TfBadge tone="neutral">{title}</TfBadge>
            <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p>
          </TfPanel>
        ))}
      </div>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <TfPanel className="p-6">
          <h2 className="font-semibold">Deployment model</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            Confirm deployment topology, environment ownership, network boundaries and operational
            responsibilities during technical evaluation.
          </p>
        </TfPanel>
        <TfPanel className="p-6">
          <h2 className="font-semibold">Support & SLA</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            Commercial support and SLA terms are scoped during contracting rather than represented
            as a universal technical guarantee.
          </p>
        </TfPanel>
        <TfPanel className="p-6">
          <h2 className="font-semibold">Subprocessors</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">
            A subprocessors list should be supplied for the actual customer deployment; this page
            does not invent a universal list.
          </p>
        </TfPanel>
      </section>
      <div className="mt-10 flex flex-wrap gap-3">
        <a className="tf-button tf-button-primary" href="/enterprise/security">
          Open security center
        </a>
        <a className="tf-button" href="/enterprise">
          Enterprise evaluation
        </a>
        <a
          className="tf-button"
          href="mailto:hello@tinlance.com?subject=ThreatFade%20Enterprise%20Procurement"
        >
          Contact procurement
        </a>
      </div>
    </PageShell>
  );
}
