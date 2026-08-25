"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

type Detection = {
  id: number;
  subject: string;
  source: string;
  severity: string;
  confidence: string;
  score: number;
  mitre_ttp: string;
  correlation_id?: string | null;
  created_at: string;
  status: string;
  assignee?: string | null;
  priority: number;
};

type InboxResponse = { items: Detection[]; pagination: { total: number; limit: number; offset: number; has_more: boolean } };

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full border border-[var(--tf-border)] px-2 py-1 text-[11px] font-medium">{children}</span>;
}

export default function SocPage() {
  const [data, setData] = useState<InboxResponse>({ items: [], pagination: { total: 0, limit: 25, offset: 0, has_more: false } });
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("created_at");
  const [order, setOrder] = useState("desc");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ limit: "25", offset: String(offset), sort, order });
      if (status !== "all") params.set("status", status);
      const response = await fetch(`/api/analyst/inbox?${params.toString()}`, { cache: "no-store" });
      if (!response.ok) throw new Error(response.status === 401 ? "Authentication required" : `Inbox unavailable (${response.status})`);
      setData((await response.json()) as InboxResponse);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Inbox unavailable");
      setData((current) => ({ ...current, items: [] }));
    } finally {
      setLoading(false);
    }
  }, [offset, order, sort, status]);

  useEffect(() => { void load(); }, [load]);

  const filtered = data.items.filter((item) => `${item.subject} ${item.source} ${item.mitre_ttp}`.toLowerCase().includes(query.toLowerCase()));

  function changeSort(value: string) {
    if (sort === value) setOrder((current) => (current === "asc" ? "desc" : "asc"));
    else { setSort(value); setOrder("desc"); }
    setOffset(0);
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--tf-text-muted)]">ThreatFade SOC</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Detection inbox</h1>
          <p className="mt-3 max-w-2xl text-[var(--tf-text-muted)]">Triage evidence-backed detections, investigate provenance, record disposition, and preserve the analyst trail.</p>
        </div>
        <Link href="/correlation" className="rounded-lg border border-[var(--tf-border)] px-4 py-2 text-sm">Correlation view</Link>
      </div>

      <section aria-label="Detection filters" className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_180px_auto]">
        <label className="sr-only" htmlFor="detection-search">Search detections</label>
        <input id="detection-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search subject, source, ATT&CK…" className="rounded-lg border border-[var(--tf-border)] bg-transparent px-4 py-3 text-sm outline-none focus:ring-2" />
        <label className="sr-only" htmlFor="detection-status">Status</label>
        <select id="detection-status" value={status} onChange={(e) => { setStatus(e.target.value); setOffset(0); }} className="rounded-lg border border-[var(--tf-border)] bg-transparent px-4 py-3 text-sm">
          <option value="all">All statuses</option><option value="new">New</option><option value="triaging">Triaging</option><option value="investigating">Investigating</option><option value="contained">Contained</option><option value="resolved">Resolved</option>
        </select>
        <select aria-label="Sort detections" value={sort} onChange={(e) => { setSort(e.target.value); setOffset(0); }} className="rounded-lg border border-[var(--tf-border)] bg-transparent px-4 py-3 text-sm">
          <option value="created_at">Newest</option><option value="score">Score</option><option value="priority">Priority</option><option value="id">Detection ID</option>
        </select>
        <button type="button" onClick={() => void load()} className="rounded-lg border border-[var(--tf-border)] px-4 py-3 text-sm" disabled={loading}>Refresh</button>
      </section>

      {error && <div role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">{error}</div>}

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--tf-border)]">
        <table className="w-full min-w-[980px] text-left text-sm">
          <caption className="sr-only">ThreatFade detection inbox</caption>
          <thead className="border-b border-[var(--tf-border)] text-xs uppercase tracking-wider text-[var(--tf-text-muted)]">
            <tr>
              <th className="px-4 py-3">Detection</th><th className="px-4 py-3"><button type="button" onClick={() => changeSort("score")}>Triage</button></th><th className="px-4 py-3">Confidence</th><th className="px-4 py-3">ATT&CK</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Assignee</th><th className="px-4 py-3"><button type="button" onClick={() => changeSort("created_at")}>Created</button></th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={7} className="px-4 py-10 text-center text-[var(--tf-text-muted)]">Loading detections…</td></tr> : filtered.map((item) => (
              <tr key={item.id} className="border-b border-[var(--tf-border)] last:border-0 hover:bg-[var(--tf-surface-muted)]">
                <td className="px-4 py-4"><Link className="font-medium hover:underline" href={`/soc/${item.id}`}>#{item.id} · {item.subject}</Link><div className="mt-1 text-xs text-[var(--tf-text-muted)]">{item.source}</div></td>
                <td className="px-4 py-4"><Badge>{item.severity}</Badge><div className="mt-1 text-xs text-[var(--tf-text-muted)]">{item.score.toFixed(2)}</div></td>
                <td className="px-4 py-4">{item.confidence}</td><td className="px-4 py-4">{item.mitre_ttp}</td><td className="px-4 py-4"><Badge>{item.status}</Badge></td><td className="px-4 py-4">{item.assignee ?? "Unassigned"}</td><td className="px-4 py-4 text-xs text-[var(--tf-text-muted)]">{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && <tr><td colSpan={7} className="px-4 py-10 text-center text-[var(--tf-text-muted)]">{error ? "No data available." : "No detections match the current filter."}</td></tr>}
          </tbody>
        </table>
      </div>

      <nav aria-label="Detection pagination" className="mt-5 flex items-center justify-between gap-4 text-sm">
        <span className="text-[var(--tf-text-muted)]">{data.pagination.total} total · showing {data.pagination.offset + 1}–{Math.min(data.pagination.offset + data.items.length, data.pagination.total)}</span>
        <div className="flex gap-2"><button type="button" disabled={offset === 0 || loading} onClick={() => setOffset((value) => Math.max(0, value - 25))} className="rounded-lg border px-3 py-2 disabled:opacity-50">Previous</button><button type="button" disabled={!data.pagination.has_more || loading} onClick={() => setOffset((value) => value + 25)} className="rounded-lg border px-3 py-2 disabled:opacity-50">Next</button></div>
      </nav>
    </main>
  );
}
