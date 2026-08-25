import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ConversionLink } from "@/components/analytics/conversion-link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

export const metadata: Metadata = {
  title: "ThreatFade Managed",
  description:
    "Managed ThreatFade detection engineering and operational support for organizations that want the capability operated for them.",
  alternates: { canonical: "/managed" },
};
const services = [
  "Deployment and production hardening assistance",
  "Detection tuning and detection-pack lifecycle management",
  "Evidence review and investigation support",
  "Threat-hunting and detection-engineering assistance",
  "Integration and workflow maintenance",
  "Monthly operational reporting and review",
  "Defined escalation and support model",
] as const;

export default function ManagedPage() {
  return (
    <PageShell
      eyebrow="ThreatFade Managed · $3,500–$15,000+/month"
      title="Buy the detection capability—and the expertise to operate it."
      description="Managed ThreatFade is a separate professional service for organizations that do not want to staff every part of detection engineering and operational review internally."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <TfPanel raised className="p-6 sm:p-8">
          <TfBadge tone="signal">What managed covers</TfBadge>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="flex gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[var(--tf-signal)]" />
                <p className="text-sm leading-6 text-[var(--tf-text-muted)]">{service}</p>
              </div>
            ))}
          </div>
        </TfPanel>
        <TfPanel className="p-6 sm:p-8">
          <TfBadge tone="neutral">Commercial model</TfBadge>
          <h2 className="mt-5 text-2xl font-semibold">Service level follows operational scope.</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">
            Starting around $3,500/month. Higher-complexity programs can reach $5,000–$15,000+/month
            depending on deployment count, detection engineering, review cadence, integration burden
            and support requirements.
          </p>
          <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">
            Managed is an expansion layer on top of the platform, not a replacement for it.
          </p>
        </TfPanel>
      </div>
      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {["Platform", "Engineering", "Operations"].map((title, index) => (
          <TfPanel key={title} className="p-6">
            <TfBadge tone={index === 0 ? "signal" : "neutral"}>{title}</TfBadge>
            <p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">
              {index === 0
                ? "Enterprise identity, tenancy, detection and evidence remain the product boundary."
                : index === 1
                  ? "Custom tuning and detection engineering address environment-specific requirements."
                  : "Ongoing review, reporting and escalation turn the platform into an operating capability."}
            </p>
          </TfPanel>
        ))}
      </section>
      <section className="mt-10 rounded-2xl border border-[var(--tf-line)] p-7 sm:p-9">
        <TfBadge tone="neutral">Commercial trust</TfBadge>
        <h2 className="mt-4 text-2xl font-semibold">No managed-service theater.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          The managed offer does not imply 24/7 coverage, certifications, contractual SLAs or
          response guarantees unless those are explicitly included in the signed scope. Support
          levels and escalation commitments are quoted and documented per engagement.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ConversionLink
            href="mailto:hello@tinlance.com?subject=ThreatFade%20Managed"
            event="request_managed"
            source="managed"
            className="tf-button tf-button-primary"
          >
            Discuss managed detection
          </ConversionLink>
          <ConversionLink
            href="/pricing"
            event="view_pricing"
            source="managed"
            className="tf-button"
          >
            View pricing
          </ConversionLink>
        </div>
      </section>
    </PageShell>
  );
}
