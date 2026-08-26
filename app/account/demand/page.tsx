"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { signalTypes, type SignalType } from "@/lib/demand-intelligence/model";

const defaultSignal: SignalType = "detection_engineering_hiring";

export default function DemandIntelligencePage() {
  const { data: session, status } = useSession();
  const [name, setName] = useState("");
  const [signal, setSignal] = useState<SignalType>(defaultSignal);
  const [strength, setStrength] = useState("0.8");
  const [confidence, setConfidence] = useState("0.8");
  const [result, setResult] = useState<{ threatFadeFit: number; buyingIntent: number; explanation: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (status === "loading") return <main className="mx-auto max-w-4xl px-6 py-16">Loading…</main>;
  if (!session) return <main className="mx-auto max-w-4xl px-6 py-16"><p role="alert">Sign in required.</p></main>;

  async function score() {
    setError(null);
    setResult(null);
    const response = await fetch("/api/demand-intelligence/score", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        accountId: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "account",
        name: name || "Unnamed account",
        buyers: [],
        signals: [{ type: signal, observedAt: new Date().toISOString(), source: "analyst-input", strength: Number(strength), confidence: Number(confidence), recencyDays: 0 }],
      }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      setError(payload?.error ?? "Scoring failed");
      return;
    }
    setResult(payload.score);
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-700">Demand intelligence</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Research an account without turning a signal into a claim.</h1>
      <p className="mt-4 max-w-3xl text-[var(--tf-text-muted)]">Fit and buying intent are separate, explainable scores. A signal can prioritize research; it does not establish that an account is buying.</p>
      <section className="mt-8 grid gap-5 rounded-2xl border border-[var(--tf-border)] p-6 md:grid-cols-2">
        <label className="text-sm">Account name<input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 block w-full rounded-lg border p-3" maxLength={160} /></label>
        <label className="text-sm">Signal<select value={signal} onChange={(e) => setSignal(e.target.value as SignalType)} className="mt-2 block w-full rounded-lg border p-3">{signalTypes.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
        <label className="text-sm">Signal strength<input type="number" min="0" max="1" step="0.05" value={strength} onChange={(e) => setStrength(e.target.value)} className="mt-2 block w-full rounded-lg border p-3" /></label>
        <label className="text-sm">Source confidence<input type="number" min="0" max="1" step="0.05" value={confidence} onChange={(e) => setConfidence(e.target.value)} className="mt-2 block w-full rounded-lg border p-3" /></label>
        <button type="button" onClick={() => void score()} className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white md:col-span-2">Calculate explainable scores</button>
      </section>
      {error && <p role="alert" className="mt-5 rounded-lg border border-red-300 p-4 text-sm">{error}</p>}
      {result && <section className="mt-6 grid gap-5 md:grid-cols-2"><div className="rounded-2xl border p-6"><p className="text-sm text-[var(--tf-text-muted)]">ThreatFade fit</p><p className="mt-2 text-5xl font-semibold">{result.threatFadeFit}<span className="text-lg">/100</span></p></div><div className="rounded-2xl border p-6"><p className="text-sm text-[var(--tf-text-muted)]">Buying intent</p><p className="mt-2 text-5xl font-semibold">{result.buyingIntent}<span className="text-lg">/100</span></p></div><div className="rounded-2xl border p-6 md:col-span-2"><h2 className="font-semibold">Why</h2><ul className="mt-3 list-disc space-y-2 pl-5 text-sm">{result.explanation.map((item) => <li key={item}>{item}</li>)}</ul></div></section>}
    </main>
  );
}
