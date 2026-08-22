import { PageShell } from "@/components/layout/page-shell";

export default function IntegrationsPage() {
  return (
    <PageShell
      eyebrow="Interoperability"
      title="A detection layer that fits the security stack you already have."
      description="ThreatFade currently exposes JSON, Splunk HEC, CEF, CSV, Sigma-compatible output, STIX 2.1-compatible bundles, MITRE ATT&CK mapping and FusionOps integration."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "JSON",
          "Splunk HEC",
          "CEF",
          "CSV",
          "Sigma-compatible",
          "STIX 2.1-compatible",
          "MITRE ATT&CK",
          "FusionOps",
        ].map((item) => (
          <div
            key={item}
            className="rounded-xl border border-white/8 bg-[#090c10] p-6 font-mono text-sm text-white/75"
          >
            {item}
          </div>
        ))}
      </div>
    </PageShell>
  );
}
