"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Detection = {
  id: number;
  subject: string;
  source: string;
  severity: string;
  confidence: number;
  score: number;
  mitre_ttp: string;
  correlation_id?: string | null;
  created_at: string;
  status: string;
  assignee?: string | null;
  priority: number;
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-[var(--tf-border)] px-2 py-1 text-[11px] font-medium">
      {children}
    </span>
  );
}

export default function SocPage() {
  const [items, setItems] = useState<Detection[]>([]);
  const [status, setStatus] = useState("all");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const qs = status === "all" ? "" : `?status=${encodeURIComponent(status)}`;
      const response = await fetch(`/api/analyst/inbox${qs}`, { cache: "no-store" });
      if (!response.ok) throw new Error(`Inbox unavailable (${response.status})`);
      setItems((await response.json()).items ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Inbox unavailable");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, [status]);

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        `${item.subject} ${item.source} ${item.mitre_ttp}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--tf-text-muted)]">
            ThreatFade SOC
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">Detection inbox</h1>
          <p className="mt-3 max-w-2xl text-[var(--tf-text-muted)]">
            Triage detections, inspect evidence and sessions, record analyst disposition, and
            preserve the audit trail.
          </p>
        </div>
        <Link
          href="/correlation"
          className="rounded-lg border border-[var(--tf-border)] px-4 py-2 text-sm"
        >
          Correlation view
        </Link>
      </div>

      <section
        aria-label="Detection filters"
        className="mt-8 grid gap-3 md:grid-cols-[1fr_180px_auto]"
      >
        <label className="sr-only" htmlFor="detection-search">
          Search detections
        </label>
        <input
          id="detection-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search subject, source, ATT&CK…"
          className="rounded-lg border border-[var(--tf-border)] bg-transparent px-4 py-3 text-sm outline-none focus:ring-2"
        />
        <label className="sr-only" htmlFor="detection-status">
          Status
        </label>
        <select
          id="detection-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-lg border border-[var(--tf-border)] bg-transparent px-4 py-3 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="triaging">Triaging</option>
          <option value="investigating">Investigating</option>
          <option value="contained">Contained</option>
          <option value="resolved">Resolved</option>
        </select>
        <button
          type="button"
          onClick={() => void load()}
          className="rounded-lg border border-[var(--tf-border)] px-4 py-3 text-sm"
        >
          Refresh
        </button>
      </section>

      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
          {error}
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--tf-border)]">
        <table className="w-full min-w-[900px] text-left text-sm">
          <caption className="sr-only">ThreatFade detection inbox</caption>
          <thead className="border-b border-[var(--tf-border)] text-xs uppercase tracking-wider text-[var(--tf-text-muted)]">
            <tr>
              <th className="px-4 py-3">Detection</th>
              <th className="px-4 py-3">Severity</th>
              <th className="px-4 py-3">Confidence</th>
              <th className="px-4 py-3">ATT&CK</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Assignee</th>
              <th className="px-4 py-3">Age</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--tf-text-muted)]">
                  Loading detections…
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--tf-border)] last:border-0 hover:bg-[var(--tf-surface-muted)]"
                >
                  <td className="px-4 py-4">
                    <Link className="font-medium hover:underline" href={`/soc/${item.id}`}>
                      #{item.id} · {item.subject}
                    </Link>
                    <div className="mt-1 text-xs text-[var(--tf-text-muted)]">{item.source}</div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge>{item.severity}</Badge>
                  </td>
                  <td className="px-4 py-4">{Math.round(item.confidence * 100)}%</td>
                  <td className="px-4 py-4">{item.mitre_ttp}</td>
                  <td className="px-4 py-4">
                    <Badge>{item.status}</Badge>
                  </td>
                  <td className="px-4 py-4">{item.assignee ?? "Unassigned"}</td>
                  <td className="px-4 py-4 text-xs text-[var(--tf-text-muted)]">
                    {new Date(item.created_at).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-[var(--tf-text-muted)]">
                  No detections match the current filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
