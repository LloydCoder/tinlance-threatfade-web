import { PageShell } from "@/components/layout/page-shell";
import { DetectionPipeline } from "@/components/marketing/core-experience";
import { TfPanel } from "@/components/ui/tf-primitives";

const loop = [['Prioritize','Use detection evidence, confidence and context to decide what deserves attention.'],['Inspect','Open the structured detection record and examine the observable evidence behind it.'],['Pivot','Use ATT&CK context, signal details and operational metadata to investigate the event.'],['Disposition','Record the analyst outcome rather than treating the detector as the final authority.'],['Handoff','Export or integrate the result into existing security operations workflows.']] as const;

export default function HowItWorksPage() {
  return <PageShell eyebrow="How it works" title="A quiet channel becomes a measurable event." description="ThreatFade's operational loop is designed around evidence: prioritize, inspect, pivot, disposition, then hand off to the systems that already run security operations.">
    <DetectionPipeline />
    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">{loop.map(([step,body], index) => <TfPanel key={step} className="p-6"><div className="font-mono text-xs text-[var(--tf-signal)]">0{index+1}</div><h2 className="mt-7 font-semibold">{step}</h2><p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p></TfPanel>)}</div>
    <TfPanel className="mt-6 p-6 sm:p-8"><h2 className="text-xl font-semibold">Architecture boundary</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--tf-text-muted)]">The repository separates the control plane from detection workloads and provides tenant-scoped persistence, audit events, an analyst console and interoperability paths. Production authentication is fail-closed and deployment-specific identity configuration remains an operational requirement.</p></TfPanel>
  </PageShell>;
}
