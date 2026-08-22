import { PageShell } from "@/components/layout/page-shell";

export default function HowItWorksPage() {
  return <PageShell eyebrow="How it works" title="A quiet channel becomes a measurable event." description="ThreatFade's operational loop is designed around evidence: prioritize, inspect, pivot, disposition, then hand off to the systems that already run security operations."><div className="space-y-4">{["Prioritize", "Inspect", "Pivot", "Disposition", "Handoff"].map((step, index) => <div key={step} className="flex gap-5 rounded-xl border border-white/8 bg-[#090c10] p-6"><span className="font-mono text-xs text-[#b8ff5a]">0{index + 1}</span><div><h2 className="font-semibold">{step}</h2><p className="mt-2 text-sm leading-7 text-white/45">The website will document this stage against the actual engine implementation and evidence model rather than using generic detection language.</p></div></div>)}</div></PageShell>;
}
