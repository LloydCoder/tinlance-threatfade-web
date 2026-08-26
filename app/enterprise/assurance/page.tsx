import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import { assuranceClaims, assuranceStatusLabel } from "@/lib/assurance/model";

export const metadata: Metadata = {
  title: "Independent assurance",
  description:
    "ThreatFade independent assurance evidence, validation boundaries and external assessment readiness.",
  alternates: { canonical: "/enterprise/assurance" },
};

function badgeTone(status: string) {
  return status === "implemented" || status === "internally-validated" ? "signal" : "neutral";
}

export default function EnterpriseAssurancePage() {
  return (
    <PageShell
      eyebrow="Independent assurance"
      title="Evidence that stops at the boundary of what has actually been verified."
      description="ThreatFade separates implementation, internal validation, external validation, independent audit and certification. This page never promotes an assurance claim without the corresponding evidence."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {assuranceClaims.map((item) => (
          <TfPanel key={item.claim} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-semibold">{item.claim}</h2>
              <TfBadge tone={badgeTone(item.status)}>
                {assuranceStatusLabel[item.status]}
              </TfBadge>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--tf-text-muted)]">{item.evidence}</p>
            {item.limitation && (
              <p className="mt-3 rounded-lg border border-amber-300/50 p-3 text-xs leading-5 text-[var(--tf-text-muted)]">
                Boundary: {item.limitation}
              </p>
            )}
          </TfPanel>
        ))}
      </div>

      <section className="mt-10 tf-panel p-6">
        <h2 className="font-semibold">External evaluation package</h2>
        <div className="mt-4 grid gap-3 text-sm leading-6 text-[var(--tf-text-muted)] md:grid-cols-2">
          <p>• Frozen detector and detection-pack versions</p>
          <p>• Corpus and blind-set manifests</p>
          <p>• Reproducible environment definition</p>
          <p>• Security testing scope and rules of engagement</p>
          <p>• Signed result artifacts and digests</p>
          <p>• Scenario-level metrics and limitations</p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/enterprise/security"
          className="tf-panel px-5 py-3 text-sm font-semibold hover:border-[var(--tf-signal)]"
        >
          Security center →
        </Link>
        <Link
          href="/enterprise/procurement"
          className="tf-panel px-5 py-3 text-sm font-semibold hover:border-[var(--tf-signal)]"
        >
          Procurement center →
        </Link>
      </div>

      <p className="mt-10 text-xs leading-5 text-[var(--tf-text-muted)]">
        No independent penetration test, independent detection validation, independent audit, SOC 2,
        ISO 27001 or other certification is claimed by this release. External evidence will be added
        only after the corresponding assessment is actually completed.
      </p>
    </PageShell>
  );
}
