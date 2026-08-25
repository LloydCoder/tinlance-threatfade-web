"use client";

import { useEffect, useState } from "react";

type Member = {
  subject: string;
  email: string | null;
  name: string | null;
  role: string;
  created_at: string;
};

export default function OrganizationSettings({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("analyst");
  const [inviteToken, setInviteToken] = useState("");
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    void params.then((value) => setId(value.id));
  }, [params]);
  useEffect(() => {
    if (!id) return;
    void fetch(`/api/identity/organizations/${id}/members`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok)
          throw new Error(response.status === 403 ? "Access denied" : "Members unavailable");
        setMembers(((await response.json()) as { items: Member[] }).items);
      })
      .catch((e) => setError(e instanceof Error ? e.message : "Members unavailable"));
  }, [id]);
  async function invite() {
    setError(null);
    setInviteToken("");
    try {
      const response = await fetch(`/api/identity/organizations/${id}/invitations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const data = (await response.json()) as { token?: string; error?: string; detail?: string };
      if (!response.ok || !data.token)
        throw new Error(data.error ?? data.detail ?? "Invitation could not be created");
      setInviteToken(data.token);
      setEmail("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Invitation could not be created");
    }
  }
  if (!id) return <main className="mx-auto max-w-4xl px-6 py-16">Loading organization…</main>;
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-semibold tracking-[-0.04em]">Organization settings</h1>
      <p className="mt-3 text-sm text-[var(--tf-text-muted)]">
        Membership and role changes are authorized by the ThreatFade engine.
      </p>
      {error && (
        <p role="alert" className="mt-5 rounded-lg border border-red-400/40 px-4 py-3 text-sm">
          {error}
        </p>
      )}
      <section className="mt-8 rounded-xl border border-[var(--tf-border)] p-6">
        <h2 className="font-semibold">Members</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <caption className="sr-only">Organization members</caption>
            <thead className="border-b">
              <tr>
                <th className="px-3 py-3">Member</th>
                <th className="px-3 py-3">Role</th>
                <th className="px-3 py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.subject} className="border-b last:border-0">
                  <td className="px-3 py-3">{member.email ?? member.name ?? member.subject}</td>
                  <td className="px-3 py-3">{member.role}</td>
                  <td className="px-3 py-3 text-xs text-[var(--tf-text-muted)]">
                    {new Date(member.created_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-6 rounded-xl border border-[var(--tf-border)] p-6">
        <h2 className="font-semibold">Invite member</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-[1fr_180px_auto]">
          <input
            aria-label="Invitee email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={320}
            placeholder="analyst@example.com"
            className="rounded-lg border bg-transparent px-4 py-3"
          />
          <select
            aria-label="Invitation role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded-lg border bg-transparent px-4 py-3"
          >
            <option value="admin">Admin</option>
            <option value="analyst">Analyst</option>
            <option value="viewer">Viewer</option>
          </select>
          <button
            type="button"
            onClick={() => void invite()}
            disabled={!email.includes("@")}
            className="rounded-lg border px-4 py-3 text-sm disabled:opacity-50"
          >
            Create invitation
          </button>
        </div>
        {inviteToken && (
          <p className="mt-4 break-all rounded-lg border border-[var(--tf-border)] p-4 text-xs">
            Invitation token created. Deliver it through your approved enterprise communication
            channel; it is shown once and stored server-side only as a hash.
            <br />
            <span className="font-mono">{inviteToken}</span>
          </p>
        )}
      </section>
    </main>
  );
}
