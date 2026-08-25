"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type PlatformSession = {
  id: number;
  organization_id: string | null;
  created_at: string;
  last_seen_at: string;
  expires_at: string;
  user_agent: string | null;
  source_ip: string | null;
};

export default function AccountPage() {
  const { data: session, status } = useSession();
  const [sessions, setSessions] = useState<PlatformSession[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    if (status !== "authenticated") return;
    void fetch("/api/identity/sessions", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Sessions unavailable");
        const data = (await response.json()) as { items: PlatformSession[] };
        setSessions(data.items);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Sessions unavailable"));
  }, [status]);
  if (status === "loading")
    return <main className="mx-auto max-w-4xl px-6 py-16">Loading account…</main>;
  if (!session)
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p role="alert">Sign in required.</p>
      </main>
    );
  async function revokeAll() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/identity/sessions/revoke-all", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Could not revoke sessions");
      await signOut({ callbackUrl: "/" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not revoke sessions");
    } finally {
      setBusy(false);
    }
  }
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Account settings</h1>
      <p className="mt-3 text-[var(--tf-text-muted)]">
        {session.user.email ?? session.user.name ?? "Authenticated user"}
      </p>
      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <section className="mt-8 rounded-xl border border-[var(--tf-border)] p-6">
        <h2 className="font-semibold">Active sessions</h2>
        <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
          Sessions are server-side revocable and expire automatically.
        </p>
        <div className="mt-5 space-y-3">
          {sessions.map((item) => (
            <article
              key={item.id}
              className="rounded-lg border border-[var(--tf-border)] p-4 text-sm"
            >
              <div className="font-medium">Session #{item.id}</div>
              <div className="mt-1 text-xs text-[var(--tf-text-muted)]">
                Last seen {new Date(item.last_seen_at).toLocaleString()} · expires{" "}
                {new Date(item.expires_at).toLocaleString()}
              </div>
              <div className="mt-1 break-all text-xs text-[var(--tf-text-muted)]">
                {item.user_agent ?? "Unknown browser"}
              </div>
            </article>
          ))}
          {!sessions.length && (
            <p className="text-sm text-[var(--tf-text-muted)]">No active sessions returned.</p>
          )}
        </div>
        <button
          disabled={busy}
          type="button"
          onClick={() => void revokeAll()}
          className="mt-5 rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
        >
          Sign out everywhere
        </button>
      </section>
      <button
        type="button"
        onClick={() => void signOut({ callbackUrl: "/" })}
        className="mt-6 rounded-lg border px-4 py-2 text-sm"
      >
        Sign out
      </button>
    </main>
  );
}
