"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Detection = { id: number; subject: string; source: string; mitre_ttp: string; score: number; confidence: string; created_at: string };
type Evidence = { id: number; type: string; media_type: string; hash: string; size_bytes: number; collected_at: string };
type Disposition = { id: number; reason: string; note: string; analyst: string; created_at: string };
type InvestigationData = { detection: Detection; workflow: { status: string; assignee: string | null }; evidence: Evidence[]; dispositions: Disposition[] };

export default function InvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [data, setData] = useState<InvestigationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  useEffect(() => { params.then((value) => setId(value.id)); }, [params]);
  useEffect(() => {
    if (!id) return;
    fetch(`/api/analyst/detections/${encodeURIComponent(id)}`, { cache: "no-store" })
      .then(async (r) => { if (!r.ok) throw new Error(`Detection unavailable (${r.status})`); return r.json() as Promise<InvestigationData>; })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : "Detection unavailable"));
  }, [id]);

  async function mutate(path: string, method: string, body: unknown) {
    setBusy(true); setError(null);
    try {
      const r = await fetch(`/api/analyst/${path}`, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!r.ok) throw new Error(`Request failed (${r.status})`);
      const fresh = await fetch(`/api/analyst/detections/${id}`, { cache: "no-store" });
      setData((await fresh.json()) as InvestigationData);
    } catch (e) { setError(e instanceof Error ? e.message : "Request failed"); }
    finally { setBusy(false); }
  }

  if (error && !data) return <main className="mx-auto max-w-5xl px-6 py-12"><p role="alert">{error}</p></main>;
  if (!data) return <main className="mx-auto max-w-5xl px-6 py-12 text-[var(--tf-text-muted)]">Loading investigation…</main>;

  const d = data.detection;
  const reasons = ["true_positive", "false_positive", "benign", "duplicate", "insufficient_evidence", "needs_tuning"];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <Link href="/soc" className="text-sm text-[var(--tf-text-muted)] hover:underline">← Detection inbox</Link>
      <header className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div><p className="text-xs uppercase tracking-[0.18em] text-[var(--tf-text-muted)]">Investigation #{d.id}</p><h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{d.subject}</h1><p className="mt-2 text-[var(--tf-text-muted)]">{d.source} · {d.mitre_ttp} · {new Date(d.created_at).toLocaleString()}</p></div>
        <div className="flex gap-2"><button disabled={busy} onClick={() => void mutate(`detections/${id}/workflow`, "PATCH", { status: "investigating" })} className="rounded-lg border px-4 py-2 text-sm">Start investigation</button><button disabled={busy} onClick={() => void mutate(`detections/${id}/workflow`, "PATCH", { status: "contained" })} className="rounded-lg border px-4 py-2 text-sm">Mark contained</button></div>
      </header>
      {error && <p role="alert" className="mt-4 rounded-lg border border-red-400/40 px-4 py-3 text-sm">{error}</p>}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-xl border border-[var(--tf-border)] p-6"><h2 className="font-semibold">Evidence</h2><p className="mt-2 text-sm text-[var(--tf-text-muted)]">Evidence is shown with provenance metadata; confidence is not evidence.</p><div className="mt-5 space-y-3">{data.evidence.length ? data.evidence.map((e) => <div key={e.id} className="rounded-lg border border-[var(--tf-border)] p-4 text-sm"><div className="flex justify-between gap-4"><span className="font-medium">{e.type}</span><span>{e.media_type}</span></div><div className="mt-2 break-all font-mono text-xs text-[var(--tf-text-muted)]">{e.hash}</div><div className="mt-2 text-xs text-[var(--tf-text-muted)]">Collected {new Date(e.collected_at).toLocaleString()} · {e.size_bytes} bytes</div></div>) : <p className="text-sm text-[var(--tf-text-muted)]">No linked evidence records.</p>}</div></div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6"><h2 className="font-semibold">Disposition</h2><textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={4000} placeholder="Analyst note / rationale" className="mt-4 min-h-24 w-full rounded-lg border border-[var(--tf-border)] bg-transparent p-3 text-sm" /><div className="mt-3 flex flex-wrap gap-2">{reasons.map((reason) => <button key={reason} disabled={busy} onClick={() => void mutate(`detections/${id}/disposition`, "POST", { reason, note })} className="rounded-lg border px-3 py-2 text-xs">{reason.replaceAll("_", " ")}</button>)}</div></div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-xl border border-[var(--tf-border)] p-6"><h2 className="font-semibold">Assessment</h2><dl className="mt-4 grid grid-cols-2 gap-4 text-sm"><div><dt className="text-xs text-[var(--tf-text-muted)]">Score</dt><dd className="mt-1 text-xl font-semibold">{d.score.toFixed(2)}</dd></div><div><dt className="text-xs text-[var(--tf-text-muted)]">Confidence</dt><dd className="mt-1 text-xl font-semibold">{d.confidence}</dd></div><div><dt className="text-xs text-[var(--tf-text-muted)]">Status</dt><dd className="mt-1">{data.workflow.status}</dd></div><div><dt className="text-xs text-[var(--tf-text-muted)]">Assignee</dt><dd className="mt-1">{data.workflow.assignee ?? "Unassigned"}</dd></div></dl></div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6"><h2 className="font-semibold">Analyst history</h2><div className="mt-4 space-y-3 text-sm">{data.dispositions.map((x) => <div key={x.id} className="border-l-2 pl-3"><div className="font-medium">{x.reason.replaceAll("_", " ")}</div><div className="text-xs text-[var(--tf-text-muted)]">{x.analyst} · {new Date(x.created_at).toLocaleString()}</div><p className="mt-1 text-[var(--tf-text-muted)]">{x.note}</p></div>)}{!data.dispositions.length && <p className="text-[var(--tf-text-muted)]">No disposition recorded.</p>}</div></div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6"><h2 className="font-semibold">Investigation timeline</h2><p className="mt-2 text-sm text-[var(--tf-text-muted)]">Use the evidence timeline to distinguish observed events from analyst conclusions.</p><Link href={`/soc/${id}/timeline`} className="mt-4 inline-block text-sm underline">Open full timeline</Link></div>
        </aside>
      </div>
    </main>
  );
}
