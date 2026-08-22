import { PageShell } from "@/components/layout/page-shell";
import { TrustBoundary } from "@/components/marketing/core-experience";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

const controls = [['Input boundary','Bounded request and PCAP inputs, finite-number validation and safe temporary PCAP handling.'],['Application boundary','Rate limiting, request IDs, restrictive CORS and security headers.'],['Runtime boundary','Non-root containers, dropped Linux capabilities and no-new-privileges controls.'],['Identity boundary','OIDC/JWT validation with issuer, audience, JWKS and time-claim validation.'],['Tenant boundary','Tenant-scoped detection persistence, RBAC and cross-tenant access denied by default.'],['Supply chain','Dependabot, CodeQL, Gitleaks, pip-audit, SBOM generation and build provenance.']] as const;

export default function SecurityPage() {
  return <PageShell eyebrow="Security" title="Security claims should be evidence-backed." description="ThreatFade documents its engineering controls and explicitly separates repository implementation from independent assurance. The web platform follows the same standard.">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{controls.map(([title,body]) => <TfPanel key={title} className="p-6"><TfBadge tone="signal">Control</TfBadge><h2 className="mt-5 font-semibold">{title}</h2><p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p></TfPanel>)}</div>
    <div className="mt-8"><TrustBoundary /></div>
    <TfPanel className="mt-6 p-6 sm:p-8"><h2 className="text-xl font-semibold">What the repository does not prove</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">The project does not self-certify SOC 2 or ISO 27001, independent penetration testing, independent detection validation, contractual SLAs, customer-scale performance guarantees, data-residency commitments or organization-level incident-response obligations. Those require separate evidence, controls, contracts or independent assessment.</p></TfPanel>
  </PageShell>;
}
