"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function TimelinePage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState(""); const [items, setItems] = useState<any[]>([]); const [error, setError] = useState<string | null>(null);
  useEffect(() => { params.then((p) => setId(p.id)); }, [params]);
  useEffect(() => { if (!id) return; fetch(`/api/analyst/detections/${id}/timeline`, { cache: "no-store" }).then(async (r) => { if (!r.ok) throw new Error(`Timeline unavailable (${r.status})`); return r.json(); }).then((x) => setItems(x.items ?? [])).catch((e) => setError(e instanceof Error ? e.message : "Timeline unavailable")); }, [id]);
  return <main className="mx-auto max-w-4xl px-6 py-10"><Link href={`/soc/${id}`} className="text-sm text-[var(--tf-text-muted)] hover:underline">← Investigation</Link><h1 className="mt-6 text-3xl font-semibold">Evidence timeline</h1><p className="mt-2 text-[var(--tf-text-muted)]">Chronological provenance for the investigation. Correlation and analyst interpretation are explicitly separated from observed records.</p>{error && <p role="alert" className="mt-5">{error}</p>}<ol className="mt-8 space-y-4">{items.map((item, index) => <li key={`${item.timestamp}-${index}`} className="relative border-l border-[var(--tf-border)] pl-6"><span className="absolute -left-1.5 top-1 h-3 w-3 rounded-full border border-[var(--tf-border)] bg-[var(--tf-bg)]"/><div className="text-xs text-[var(--tf-text-muted)]">{new Date(item.timestamp).toLocaleString()}</div><div className="mt-1 font-medium">{item.kind === "evidence" ? `Evidence · ${item.evidence_type}` : item.event_type}</div>{item.kind === "evidence" ? <div className="mt-1 break-all font-mono text-xs text-[var(--tf-text-muted)]">SHA-256 {item.hash}</div> : <pre className="mt-2 overflow-auto rounded-lg border border-[var(--tf-border)] p-3 text-xs">{JSON.stringify(item.payload, null, 2)}</pre>}</li>)}{!items.length && <li className="text-sm text-[var(--tf-text-muted)]">No timeline records yet.</li>}</ol></main>;
}
