import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import { enterpriseCapabilities } from "@/lib/enterprise/model";

export const metadata: Metadata = {
  title: "Enterprise security center",
  description: "ThreatFade enterprise security, architecture and assurance evidence center.",
  alternates: { canonical: "/enterprise/security" },
};

const evidenceLinks = [
  ["Architecture", "/how-it-works", "Control-plane, detection-plane and deployment boundaries."],
  ["Security", "/security", "Implemented application-security controls and assurance limits."],
  [
    "Independent assurance",
    "/enterprise/assurance",
    "External-validation evidence and explicit claim boundaries.",
  ],
  ["Documentation", "/docs/getting-started", "Operational and deployment documentation."],
  ["Vulnerability disclosure", "/security", "Security reporting and responsible disclosure path."],
  [
    "Procurement",
    "/enterprise/procurement",
    "Questionnaire-ready evidence index and contact path.",
  ],
] as const;

export default function EnterpriseSecurityPage() {
  return (
    <PageShell
      eyebrow="Enterprise security center"
      title="Evidence first. Claims stay bounded by what is actually deployed."
      description="This center separates implemented controls from documented interfaces, on-demand capabilities and items that are deliberately not claimed. It is intended for security architects, procurement teams and technical evaluators."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {enterpriseCapabilities.map((item) => (
          <TfPanel key={`${item.area}-${item.capability}`} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tf-text-muted)]">
                  {item.area}
                </p>
                <h2 className="mt-2 font-semibold">{item.capability}</h2>
              </div>
              <TfBadge tone={item.status === "implemented" ? "signal" : "neutral"}>
                {item.status}
              </TfBadge>
            </div>
            <p className="mt-4 text-sm leading-6 text-[var(--tf-text-muted)]">{item.evidence}</p>
            {item.limitation && (
              <p className="mt-3 rounded-lg border border-amber-300/50 p-3 text-xs leading-5 text-[var(--tf-text-muted)]">
                Limitation: {item.limitation}
              </p>
            )}
          </TfPanel>
        ))}
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {evidenceLinks.map(([title, href, body]) => (
          <Link
            key={href}
            href={href}
            className="tf-panel p-6 transition hover:border-[var(--tf-signal)]"
          >
            <h2 className="font-semibold">{title} →</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--tf-text-muted)]">{body}</p>
          </Link>
        ))}
      </section>

      <p className="mt-10 text-xs leading-5 text-[var(--tf-text-muted)]">
        ThreatFade does not claim SOC 2, ISO 27001, FedRAMP, PCI DSS or other certification from
        this page. Independent assurance is reported only when the corresponding evidence exists.
      </p>
    </PageShell>
  );
}
