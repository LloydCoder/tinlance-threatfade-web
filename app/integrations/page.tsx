import { PageShell } from "@/components/layout/page-shell";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

const integrations = [['JSON','Structured detection output for application and analyst workflows.'],['Splunk HEC','Operational export path for Splunk HTTP Event Collector deployments.'],['CEF','Common Event Format output for compatible security workflows.'],['CSV','Portable tabular export for analysis and handoff.'],['Sigma-compatible','Detection-oriented output for compatible Sigma workflows.'],['STIX 2.1-compatible','Threat-intelligence exchange bundles for compatible consumers.'],['MITRE ATT&CK','Technique context attached to supported detections.'],['FusionOps','Operational integration path into the Tinlance SOC orchestration product.']] as const;

export default function IntegrationsPage() {
  return <PageShell eyebrow="Interoperability" title="A detection layer that fits the security stack you already have." description="ThreatFade currently exposes JSON, Splunk HEC, CEF, CSV, Sigma-compatible output, STIX 2.1-compatible bundles, MITRE ATT&CK mapping and FusionOps integration.">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{integrations.map(([name,body]) => <TfPanel key={name} className="p-6"><TfBadge tone="neutral">{name}</TfBadge><p className="mt-4 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p></TfPanel>)}</div>
    <TfPanel className="mt-6 p-6 sm:p-8"><h2 className="text-xl font-semibold">Positioning</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">ThreatFade is not positioned as a replacement for an enterprise SIEM or SOAR. Its current role is a specialized detection and evidence layer that can feed existing security operations systems.</p></TfPanel>
  </PageShell>;
}
