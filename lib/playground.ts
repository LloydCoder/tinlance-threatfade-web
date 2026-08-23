import { z } from "zod";
export const playgroundScenarioSchema = z.enum(["c2_quieting", "lotl_gradual", "gnss_jam", "normal_with_fade", "mixed"]);
export type PlaygroundScenario = z.infer<typeof playgroundScenarioSchema>;
export const playgroundRequestSchema = z.object({ scenario: playgroundScenarioSchema }).strict();
export const playgroundScenarios = [
  { id: "c2_quieting", label: "C2 quieting", description: "Normal activity → sustained signal reduction → gradual recovery.", rule: "TF-C2-001", note: "Shape derived from the engine's documented C2 quieting test generator. The website does not execute the production detector." },
  { id: "lotl_gradual", label: "LOTL gradual fade", description: "A gradual reduction in observable activity associated with the documented LOTL scenario.", rule: "TF-LOTL-001", note: "Shape derived from the engine's documented LOTL test generator. The website does not execute the production detector." },
  { id: "gnss_jam", label: "GNSS jamming", description: "Stable signal → sharp reduction → noisy floor → recovery.", rule: "TF-GNSS-001", note: "Shape derived from the engine's documented GNSS test generator. The website does not execute the production detector." },
  { id: "normal_with_fade", label: "Normal transient dip", description: "A short-lived dip followed by normal activity, useful for understanding the false-positive boundary.", rule: "No detection rule asserted", note: "The engine describes this as a normal-variance test pattern. No detection verdict is asserted by this website." },
  { id: "mixed", label: "Mixed laboratory set", description: "A curated sequence combining the documented C2, LOTL and GNSS pattern shapes.", rule: "Multiple source rules", note: "A visualization of source-generator patterns, not a benchmark or live detection result." },
] as const;
function clamp(v: number) { return Math.max(0, Math.min(1, v)); }
function noise(i: number, s = 0.025) { return (((i * 17) % 19) / 18 - 0.5) * s; }
function c2(n = 64) { return Array.from({ length: n }, (_, i) => clamp((i < 13 ? 0.78 : i < 39 ? 0.18 : 0.18 + 0.48 * ((i - 39) / (n - 39))) + noise(i))); }
function lotl(n = 64) { return Array.from({ length: n }, (_, i) => clamp(0.82 * (1 - i / n) + noise(i, 0.02))); }
function gnss(n = 64) { return Array.from({ length: n }, (_, i) => clamp((i < 16 ? 0.86 : i < 48 ? 0.13 : 0.62) + noise(i, 0.04))); }
function normal(n = 64) { return Array.from({ length: n }, (_, i) => clamp((i > 26 && i < 33 ? 0.42 : 0.75) + noise(i, 0.018))); }
export function getPlaygroundDataset(scenario: PlaygroundScenario) {
  const values = scenario === "c2_quieting" ? c2() : scenario === "lotl_gradual" ? lotl() : scenario === "gnss_jam" ? gnss() : scenario === "normal_with_fade" ? normal() : [...c2(22), ...lotl(21), ...gnss(21)];
  const meta = playgroundScenarios.find((x) => x.id === scenario)!;
  return { scenario, label: meta.label, description: meta.description, rule: meta.rule, note: meta.note, source: "ThreatFade engine agents/signal_generator.py pattern descriptions; deterministic web visualization", execution: "website-only-curated", values, timestamps: values.map((_, i) => i), stages: [
    { id: "traffic", label: "Traffic", state: "sample" }, { id: "signals", label: "Signal extraction", state: "represented" }, { id: "behavior", label: "Behavioral analysis", state: "represented" }, { id: "deviation", label: "Deviation", state: "represented" }, { id: "detection", label: "Detection", state: "not-executed" }, { id: "evidence", label: "Evidence", state: "not-executed" }, { id: "confidence", label: "Confidence", state: "not-executed" }, { id: "attack", label: "ATT&CK mapping", state: "not-executed" }, { id: "timeline", label: "Timeline", state: "represented" },
  ] as const };
}
