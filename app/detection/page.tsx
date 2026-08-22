import { PageShell } from "@/components/layout/page-shell";
import { DetectionPipeline } from "@/components/marketing/core-experience";
import { BehavioralLab } from "@/components/marketing/behavioral-lab";
import { TfPanel } from "@/components/ui/tf-primitives";

export default function DetectionPage() {
  return <PageShell eyebrow="Detection" title="Detect behavioral fade, not just loud indicators." description="ThreatFade's current detection baseline combines rolling Shannon entropy, z-score anomaly detection, detection rules, confidence scoring and an optional Isolation Forest layer.">
    <BehavioralLab />
    <div className="mt-12"><h2 className="mb-6 text-2xl font-semibold">Current detection pipeline</h2><DetectionPipeline /></div>
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {[['C2','C2 quieting scenarios and detection rule TF-C2-001.'],['LOTL','Gradual living-off-the-land activity reduction and TF-LOTL-001.'],['GNSS','Signal disruption scenarios and TF-GNSS-001.']].map(([label,body]) => <TfPanel key={label} className="p-6"><div className="font-mono text-xs text-[var(--tf-signal)]">{label}</div><p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p></TfPanel>)}
    </div>
  </PageShell>;
}
