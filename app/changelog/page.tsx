import { PageShell } from "@/components/layout/page-shell";
import { siteConfig } from "@/config/site";

export default function ChangelogPage() {
  return (
    <PageShell
      eyebrow="Changelog"
      title="Track the system as it evolves."
      description="The public changelog connects website releases to verified implementation and documentation evidence rather than marketing claims."
    >
      <div className="space-y-4">
        <article className="rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-7">
          <div className="font-mono text-xs text-[var(--tf-signal)]">
            ThreatFade Web v{siteConfig.version} · Phase 16
          </div>
          <h2 className="mt-4 text-xl font-semibold">Research and Content Scale</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            Added the flagship Behavioral Fade Detection Reproducibility Study v1 protocol,
            benchmark protocol, public Detection Challenge, searchable research index,
            evidence-class metadata, research artifacts, expanded technical topic cluster and
            editorial governance.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            No benchmark or detection result was invented. Planned protocols remain labeled planned,
            synthetic evidence remains synthetic, and project validation is not represented as
            independent assurance.
          </p>
        </article>

        <article className="rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-7">
          <div className="font-mono text-xs text-[var(--tf-signal)]">Phase 15</div>
          <h2 className="mt-4 text-xl font-semibold">Conversion engine</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            Added the canonical acquisition-to-revenue event taxonomy, privacy-safe attribution,
            server-side analytics boundary, authenticated funnel reporting and hardened commercial
            lead capture.
          </p>
        </article>

        <article className="rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-7">
          <div className="font-mono text-xs text-[var(--tf-signal)]">Phase 14</div>
          <h2 className="mt-4 text-xl font-semibold">Commercialization</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            Added the commercial pricing and value ladder, Detection Gap Assessment, paid pilot,
            enterprise evaluation and managed detection experiences.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            The open-core boundary remains explicit: pricing pages do not claim billing,
            entitlements, certifications, customer proof or security outcomes that have not been
            implemented or independently validated.
          </p>
        </article>

        <article className="rounded-xl border border-[var(--tf-line)] bg-[var(--tf-panel)] p-7">
          <div className="font-mono text-xs text-[var(--tf-text-subtle)]">Phase 13</div>
          <h2 className="mt-4 text-xl font-semibold">Authenticated platform</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">
            Enterprise identity, organizations, RBAC and tenant isolation provide the authenticated
            foundation used by the commercial workspace.
          </p>
        </article>
      </div>
    </PageShell>
  );
}
