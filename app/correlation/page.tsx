import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { CorrelationEvidenceView } from "@/components/detection/correlation-evidence-view";

export const metadata: Metadata = {
  title: "Multi-domain correlation | ThreatFade",
  description:
    "How ThreatFade correlates independent signal domains in time while preserving uncertainty and the boundary between observed correlation and causal attribution.",
  alternates: { canonical: "/correlation" },
};

export default function CorrelationPage() {
  return (
    <PageShell
      eyebrow="Detection science"
      title="Multi-domain fade correlation"
      description="A reusable temporal-correlation model for network, GNSS, endpoint, RF and future physical-signal observations."
    >
      <CorrelationEvidenceView />
    </PageShell>
  );
}
