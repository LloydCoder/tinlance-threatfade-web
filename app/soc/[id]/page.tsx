"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Detection = {
  id: number;
  subject: string;
  source: string;
  mitre_ttp: string;
  score: number;
  confidence: string;
  triage_severity?: string;
  created_at: string;
  correlation_id?: string | null;
  evidence: Record<string, unknown>;
  provenance: Record<string, unknown>;
};
type Evidence = {
  id: number;
  type: string;
  media_type: string;
  hash: string;
  size_bytes: number;
  collected_at: string;
  source_uri?: string | null;
};
type Entity = {
  id: number;
  entity_type: string;
  entity_key: string;
  attributes: Record<string, unknown>;
  created_at: string;
};
type Session = {
  id: number;
  session_key: string;
  protocol?: string | null;
  started_at?: string | null;
  ended_at?: string | null;
  attributes: Record<string, unknown>;
};
type Disposition = {
  id: number;
  reason: string;
  note: string;
  analyst: string;
  created_at: string;
};
type Case = { id: number; title: string; status: string; owner: string; created_at: string };
type InvestigationData = {
  detection: Detection;
  workflow: { status: string; assignee: string | null; priority: number };
  evidence: Evidence[];
  entities: Entity[];
  sessions: Session[];
  dispositions: Disposition[];
  cases: Case[];
};

const reasons = [
  "true_positive",
  "false_positive",
  "benign",
  "duplicate",
  "insufficient_evidence",
  "needs_tuning",
] as const;
const formatDate = (value?: string | null) => (value ? new Date(value).toLocaleString() : "—");

export default function InvestigationPage({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [data, setData] = useState<InvestigationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    void params.then((value) => setId(value.id));
  }, [params]);
  const refresh = async () => {
    if (!id) return;
    const response = await fetch(`/api/analyst/detections/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error(
        response.status === 401
          ? "Authentication required"
          : `Detection unavailable (${response.status})`,
      );
    setData((await response.json()) as InvestigationData);
  };
  useEffect(() => {
    if (id)
      void refresh().catch((e) =>
        setError(e instanceof Error ? e.message : "Detection unavailable"),
      );
  }, [id]);
  async function mutate(path: string, method: string, body: unknown) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch(`/api/analyst/${path}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok)
        throw new Error(
          response.status === 403
            ? "You are not authorized for this action"
            : `Request failed (${response.status})`,
        );
      await refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }
  if (error && !data)
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <p role="alert" className="rounded-lg border border-red-400/40 px-4 py-3">
          {error}
        </p>
      </main>
    );
  if (!data)
    return (
      <main className="mx-auto max-w-5xl px-6 py-12 text-[var(--tf-text-muted)]">
        Loading investigation…
      </main>
    );
  const d = data.detection;
  return (
    <main className="mx-auto max-w-7xl px-6 py-10" aria-busy={busy}>
      <Link href="/soc" className="text-sm text-[var(--tf-text-muted)] hover:underline">
        ← Detection inbox
      </Link>
      <header className="mt-6 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--tf-text-muted)]">
            Investigation #{d.id}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-[-0.04em]">{d.subject}</h1>
          <p className="mt-2 text-[var(--tf-text-muted)]">
            {d.source} · {d.mitre_ttp} · {formatDate(d.created_at)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            disabled={busy}
            onClick={() =>
              void mutate(`detections/${id}/workflow`, "PATCH", { status: "triaging" })
            }
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Start triage
          </button>
          <button
            disabled={busy}
            onClick={() =>
              void mutate(`detections/${id}/workflow`, "PATCH", { status: "investigating" })
            }
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Investigate
          </button>
          <button
            disabled={busy}
            onClick={() =>
              void mutate(`detections/${id}/workflow`, "PATCH", { status: "contained" })
            }
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Mark contained
          </button>
          <button
            disabled={busy}
            onClick={() =>
              void mutate(`detections/${id}/cases`, "POST", {
                title: `Investigation: ${d.subject}`,
              })
            }
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Create case
          </button>
        </div>
      </header>
      {error && (
        <p role="alert" className="mt-4 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section className="space-y-6">
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Evidence</h2>
            <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
              Observed evidence is separated from analytical confidence. Provenance metadata is
              preserved.
            </p>
            <div className="mt-5 space-y-3">
              {data.evidence.length ? (
                data.evidence.map((e) => (
                  <article
                    key={e.id}
                    className="rounded-lg border border-[var(--tf-border)] p-4 text-sm"
                  >
                    <div className="flex flex-wrap justify-between gap-3">
                      <span className="font-medium">{e.type}</span>
                      <span>{e.media_type}</span>
                    </div>
                    <div className="mt-2 break-all font-mono text-xs text-[var(--tf-text-muted)]">
                      SHA-256 {e.hash}
                    </div>
                    <div className="mt-2 text-xs text-[var(--tf-text-muted)]">
                      Collected {formatDate(e.collected_at)} · {e.size_bytes} bytes
                    </div>
                  </article>
                ))
              ) : (
                <p className="text-sm text-[var(--tf-text-muted)]">No linked evidence records.</p>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Sessions and entities</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-medium">Sessions</h3>
                {data.sessions.length ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {data.sessions.map((s) => (
                      <li key={s.id} className="rounded-lg border border-[var(--tf-border)] p-3">
                        <span className="font-medium">{s.protocol ?? "Unknown"}</span>
                        <span className="ml-2 text-[var(--tf-text-muted)]">{s.session_key}</span>
                        <div className="mt-1 text-xs text-[var(--tf-text-muted)]">
                          {formatDate(s.started_at)} → {formatDate(s.ended_at)}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-[var(--tf-text-muted)]">No linked sessions.</p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium">Entities</h3>
                {data.entities.length ? (
                  <ul className="mt-2 space-y-2 text-sm">
                    {data.entities.map((e) => (
                      <li key={e.id} className="rounded-lg border border-[var(--tf-border)] p-3">
                        <span className="font-medium">{e.entity_type}</span>
                        <div className="mt-1 break-all text-xs text-[var(--tf-text-muted)]">
                          {e.entity_key}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-2 text-sm text-[var(--tf-text-muted)]">No linked entities.</p>
                )}
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Disposition</h2>
            <label className="sr-only" htmlFor="analyst-note">
              Analyst note
            </label>
            <textarea
              id="analyst-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              maxLength={4000}
              placeholder="Analyst note / rationale"
              className="mt-4 min-h-24 w-full rounded-lg border border-[var(--tf-border)] bg-transparent p-3 text-sm"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {reasons.map((reason) => (
                <button
                  key={reason}
                  disabled={busy}
                  onClick={() =>
                    void mutate(`detections/${id}/disposition`, "POST", { reason, note })
                  }
                  className="rounded-lg border px-3 py-2 text-xs"
                >
                  {reason.replaceAll("_", " ")}
                </button>
              ))}
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Assessment</h2>
            <dl className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Score</dt>
                <dd className="mt-1 text-xl font-semibold">{d.score.toFixed(2)}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Confidence</dt>
                <dd className="mt-1 text-xl font-semibold">{d.confidence}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Triage</dt>
                <dd className="mt-1">{d.triage_severity ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Status</dt>
                <dd className="mt-1">{data.workflow.status}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Assignee</dt>
                <dd className="mt-1">{data.workflow.assignee ?? "Unassigned"}</dd>
              </div>
              <div>
                <dt className="text-xs text-[var(--tf-text-muted)]">Priority</dt>
                <dd className="mt-1">{data.workflow.priority}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Cases</h2>
            {data.cases.length ? (
              <ul className="mt-4 space-y-2 text-sm">
                {data.cases.map((c) => (
                  <li key={c.id} className="rounded-lg border border-[var(--tf-border)] p-3">
                    <div className="font-medium">
                      #{c.id} · {c.title}
                    </div>
                    <div className="mt-1 text-xs text-[var(--tf-text-muted)]">
                      {c.status} · {c.owner}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-[var(--tf-text-muted)]">
                No case linked. Create one to preserve investigation ownership.
              </p>
            )}
          </div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Analyst history</h2>
            <div className="mt-4 space-y-3 text-sm">
              {data.dispositions.map((x) => (
                <div key={x.id} className="border-l-2 pl-3">
                  <div className="font-medium">{x.reason.replaceAll("_", " ")}</div>
                  <div className="text-xs text-[var(--tf-text-muted)]">
                    {x.analyst} · {formatDate(x.created_at)}
                  </div>
                  <p className="mt-1 text-[var(--tf-text-muted)]">{x.note}</p>
                </div>
              ))}
              {!data.dispositions.length && (
                <p className="text-[var(--tf-text-muted)]">No disposition recorded.</p>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--tf-border)] p-6">
            <h2 className="font-semibold">Investigation timeline</h2>
            <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
              Observed evidence and analyst actions are rendered separately.
            </p>
            <Link href={`/soc/${id}/timeline`} className="mt-4 inline-block text-sm underline">
              Open full timeline
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
