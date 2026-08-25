"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Organization = { id: string; name: string; slug: string; role: string; created_at: string };

export default function OrganizationsPage() {
  const { status } = useSession();
  const [items, setItems] = useState<Organization[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  async function load() {
    const response = await fetch("/api/identity/organizations", { cache: "no-store" });
    if (!response.ok) throw new Error("Organizations unavailable");
    setItems(((await response.json()) as { items: Organization[] }).items);
  }
  useEffect(() => {
    if (status === "authenticated")
      void load().catch((e) =>
        setError(e instanceof Error ? e.message : "Organizations unavailable"),
      );
  }, [status]);
  async function create() {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/identity/organizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug: slug || undefined }),
      });
      if (!response.ok) throw new Error("Organization could not be created");
      setName("");
      setSlug("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Organization could not be created");
    } finally {
      setBusy(false);
    }
  }
  async function switchOrganization(id: string) {
    setBusy(true);
    setError(null);
    try {
      const response = await fetch("/api/identity/sessions/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ organization_id: id }),
      });
      if (!response.ok) throw new Error("Organization switch denied");
      window.location.assign("/soc");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Organization switch denied");
    } finally {
      setBusy(false);
    }
  }
  if (status !== "authenticated")
    return <main className="mx-auto max-w-4xl px-6 py-16">Sign in required.</main>;
  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Organizations</h1>
      <p className="mt-3 text-[var(--tf-text-muted)]">
        Organization membership is the authoritative tenant and RBAC boundary.
      </p>
      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <section className="mt-8 rounded-xl border border-[var(--tf-border)] p-6">
        <h2 className="font-semibold">Your organizations</h2>
        <div className="mt-4 space-y-3">
          {items.map((org) => (
            <article
              key={org.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--tf-border)] p-4"
            >
              <div>
                <div className="font-medium">{org.name}</div>
                <div className="text-xs text-[var(--tf-text-muted)]">
                  {org.slug} · {org.role}
                </div>
              </div>
              <button
                disabled={busy}
                type="button"
                onClick={() => void switchOrganization(org.id)}
                className="rounded-lg border px-3 py-2 text-sm"
              >
                Use organization
              </button>
            </article>
          ))}
        </div>
        {!items.length && (
          <p className="mt-4 text-sm text-[var(--tf-text-muted)]">
            No organizations yet. Create one below.
          </p>
        )}
      </section>
      <section className="mt-6 rounded-xl border border-[var(--tf-border)] p-6">
        <h2 className="font-semibold">Create organization</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <input
            aria-label="Organization name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={120}
            placeholder="Organization name"
            className="rounded-lg border bg-transparent px-4 py-3"
          />
          <input
            aria-label="Organization slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            maxLength={63}
            placeholder="organization-slug"
            className="rounded-lg border bg-transparent px-4 py-3"
          />
        </div>
        <button
          disabled={busy || name.trim().length < 2}
          type="button"
          onClick={() => void create()}
          className="mt-4 rounded-lg border px-4 py-2 text-sm disabled:opacity-50"
        >
          Create organization
        </button>
      </section>
    </main>
  );
}
