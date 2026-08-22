import { PageShell } from "@/components/layout/page-shell";
import { AudienceCards } from "@/components/marketing/core-experience";
import { TfBadge, TfPanel } from "@/components/ui/tf-primitives";

export default function ProductPage() {
  return <PageShell eyebrow="Product" title="An evidence-first detection and investigation platform." description="ThreatFade models deliberate reductions in observable adversarial behavior, scores the deviation and preserves the evidence analysts need to investigate it.">
    <div className="grid gap-4 md:grid-cols-2">
      {[['Detection','Behavioral change is the object of analysis.','Rolling Shannon entropy, statistical deviation, detection rules and an optional ML anomaly layer form the current detection baseline.'],['Evidence','A detection should leave an inspection trail.','Detection records preserve structured evidence, confidence and context for analyst review and disposition.'],['Workflow','Prioritize → Inspect → Pivot → Disposition → Handoff.','The engine includes an analyst console and operational paths designed to complement existing security operations.'],['Open source','The implementation is part of the product surface.','The repository contains the detection engine, API, dashboard, validation framework and interoperability layer.']].map(([title,heading,body]) => <TfPanel key={title} className="p-6 sm:p-8"><TfBadge tone="neutral">{title}</TfBadge><h2 className="mt-6 text-xl font-semibold">{heading}</h2><p className="mt-3 text-sm leading-7 text-[var(--tf-text-muted)]">{body}</p></TfPanel>)}
    </div>
    <div className="mt-12"><h2 className="mb-6 text-2xl font-semibold">Choose your evaluation path</h2><AudienceCards /></div>
  </PageShell>;
}
