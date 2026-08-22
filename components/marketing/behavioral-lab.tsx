"use client";

import { useState } from "react";
import { TfBadge, TfLabel, TfMetric, TfPanel } from "@/components/ui/tf-primitives";

const scenarios = {
  "C2 quieting": { summary: "A communication pattern becomes less observable over time.", deviation: "signal reduction", mapping: "C2", path: "M0 150 C70 110 125 185 190 145 S310 105 370 148 S475 192 535 142 S610 112 650 145 C690 176 704 216 760 232 S845 212 900 228" },
  "LOTL gradual fade": { summary: "Observable activity tapers while the operational pattern remains measurable.", deviation: "activity taper", mapping: "LOTL", path: "M0 148 C90 126 130 176 220 142 S340 122 430 150 S520 165 600 142 C660 126 700 152 740 178 S820 214 900 218" },
  "GNSS jamming": { summary: "Signal quality changes in a way that can be analyzed as a behavioral deviation.", deviation: "signal disruption", mapping: "GNSS", path: "M0 150 C75 130 120 168 180 146 S300 112 360 150 S470 184 520 146 C560 116 600 188 640 145 L700 155 L730 132 L760 182 L790 138 L820 176 L850 146 L900 160" },
} as const;

type Scenario = keyof typeof scenarios;

export function BehavioralLab() {
  const [scenario, setScenario] = useState<Scenario>("C2 quieting");
  const current = scenarios[scenario];

  return <TfPanel raised className="overflow-hidden"><div className="flex flex-col gap-4 border-b border-[var(--tf-line)] p-5 sm:flex-row sm:items-center sm:justify-between"><div><TfLabel>Behavioral signal lab</TfLabel><p className="mt-2 text-sm text-[var(--tf-text-muted)]">Illustrative telemetry patterns grounded in supported ThreatFade scenarios. Not a live detection result.</p></div><TfBadge tone="signal">Research surface</TfBadge></div><div className="grid lg:grid-cols-[1fr_18rem]"><div className="border-b border-[var(--tf-line)] p-4 sm:p-6 lg:border-b-0 lg:border-r"><div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="ThreatFade scenarios">{(Object.keys(scenarios) as Scenario[]).map((name) => <button key={name} type="button" aria-pressed={scenario === name} onClick={() => setScenario(name)} className="rounded-md border px-3 py-2 text-xs font-medium transition data-[active=true]:border-[color-mix(in_srgb,var(--tf-signal)_45%,transparent)] data-[active=true]:bg-[var(--tf-signal-soft)] data-[active=true]:text-[var(--tf-signal)]" data-active={scenario === name}>{name}</button>)}</div><svg viewBox="0 0 900 300" className="w-full" role="img" aria-label={`${scenario} illustrative behavioral signal visualization`}><g stroke="currentColor" opacity="0.08"><path d="M0 60H900M0 120H900M0 180H900M0 240H900" /><path d="M90 0V300M270 0V300M450 0V300M630 0V300M810 0V300" /></g><path d={current.path} fill="none" stroke="var(--tf-signal)" strokeWidth="4" strokeLinecap="round" /><path d="M650 45V255" stroke="var(--tf-danger)" strokeDasharray="4 8" opacity="0.55" /><circle cx="650" cy="145" r="7" fill="var(--tf-signal)" /><text x="20" y="282" fill="var(--tf-text-subtle)" fontSize="12" fontFamily="monospace">baseline / observable activity</text><text x="665" y="282" fill="var(--tf-danger)" fontSize="12" fontFamily="monospace">behavioral change</text></svg></div><div className="p-5 sm:p-6"><TfLabel>Signal interpretation</TfLabel><p className="mt-3 text-sm leading-6 text-[var(--tf-text-muted)]">{current.summary}</p><div className="mt-7 grid gap-5"><TfMetric label="Observed change" value={current.deviation} /><TfMetric label="Scenario family" value={current.mapping} /><TfMetric label="Next step" value="Inspect evidence" detail="Detection → evidence → disposition" /></div></div></div></TfPanel>;
}
