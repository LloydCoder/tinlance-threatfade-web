import { PageShell } from "@/components/layout/page-shell";

export default function SecurityPage() {
  return (
    <PageShell
      eyebrow="Security"
      title="Security claims should be evidence-backed."
      description="ThreatFade documents its engineering controls and explicitly separates repository implementation from independent assurance. The web platform follows the same standard."
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          "Bounded request and PCAP inputs",
          "Rate limiting and request IDs",
          "Restrictive CORS and security headers",
          "Safe temporary PCAP handling",
          "Non-root containers and dropped capabilities",
          "Dependabot, CodeQL, Gitleaks and pip-audit",
          "SBOM and build provenance",
          "OIDC/JWT validation and tenant isolation",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/8 bg-[#090c10] p-5 text-sm text-white/65"
          >
            {item}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
