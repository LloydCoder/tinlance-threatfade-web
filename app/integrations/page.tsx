import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";
import truth from "@/content/engine-truth.json";

export const metadata: Metadata = {
  title: "Integrations",
  description:
    "ThreatFade interoperability registry: exports, adapters, compatible formats, directions, test status and deployment limitations.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "ThreatFade Integrations",
    description:
      "A technical interoperability registry for ThreatFade exports, adapters and compatible formats.",
    url: "/integrations",
  },
  twitter: {
    card: "summary_large_image",
    title: "ThreatFade Integrations",
    description:
      "A technical interoperability registry for ThreatFade exports, adapters and compatible formats.",
  },
};

const typeDescription: Record<string, string> = {
  EXPORT: "ThreatFade produces data another system can consume.",
  ADAPTER:
    "ThreatFade translates its canonical event into a bounded external-system interface; this is not a native vendor integration claim.",
  COMPATIBLE:
    "ThreatFade uses an ecosystem format or mapping without claiming a native vendor connector.",
};

export default function IntegrationsPage() {
  return (
    <PageShell
      eyebrow="Interoperability"
      title="Know exactly how ThreatFade connects."
      description="Every listed destination is labeled as an export, adapter or compatibility surface. Repository tests establish implementation correctness; they do not prove live connectivity to every third-party deployment."
    >
      <TfPanel className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3">
          <TfBadge tone="signal">Authoritative registry</TfBadge>
          <TfBadge tone="neutral">v{truth.version}</TfBadge>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          Native integration is deliberately not used as a blanket label. The current engine's
          enterprise integration layer is an adapter/export boundary with shared authentication,
          TLS, retry, idempotency, audit and dead-letter controls.
        </p>
      </TfPanel>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {truth.integrations.map((item) => (
          <TfPanel key={item.name} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="mt-1 text-xs text-[var(--tf-text-subtle)]">{item.direction}</p>
              </div>
              <div className="flex gap-2">
                <TfBadge tone="neutral">{item.type}</TfBadge>
                <TfBadge tone={item.status === "TESTED" ? "signal" : "neutral"}>
                  {item.status}
                </TfBadge>
              </div>
            </div>
            <dl className="mt-5 grid gap-3 text-sm">
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
                  Protocol / format
                </dt>
                <dd className="mt-1 text-[var(--tf-text-muted)]">{item.protocol}</dd>
              </div>
              <div>
                <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
                  Meaning of status
                </dt>
                <dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">
                  {typeDescription[item.type]}
                </dd>
              </div>
              {"limitation" in item && item.limitation ? (
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--tf-text-subtle)]">
                    Limitation
                  </dt>
                  <dd className="mt-1 leading-6 text-[var(--tf-text-muted)]">{item.limitation}</dd>
                </div>
              ) : null}
            </dl>
          </TfPanel>
        ))}
      </div>

      <TfPanel className="mt-8 p-6 sm:p-8">
        <h2 className="text-xl font-semibold">Deployment boundary</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">
          Destination authentication and receiver configuration remain deployment-specific. For
          example, Sentinel requires the configured Azure Logs Ingestion boundary; QRadar receives
          CEF through the deployment-selected transport; OpenCTI and TheHive mappings must match the
          target release.
        </p>
      </TfPanel>
    </PageShell>
  );
}
