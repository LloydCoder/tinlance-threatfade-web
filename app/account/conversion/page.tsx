import { getServerSession } from "next-auth/next";
import type { Session } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { analyticsProvider } from "@/lib/analytics/provider";
import { eventStage, type ConversionEvent } from "@/lib/analytics/taxonomy";

const funnelOrder: ConversionEvent[] = [
  "page_view",
  "research_open",
  "docs_start",
  "github_view",
  "playground_start",
  "detection_complete",
  "evaluation_request",
  "assessment_request",
  "pilot_request",
  "enterprise_request",
];

function isAnalyticsAdmin(session: Session | null) {
  const configured = (process.env.THREATFADE_ANALYTICS_ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(session?.user?.email && configured.includes(session.user.email.toLowerCase()));
}

export default async function ConversionDashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login?callbackUrl=/account/conversion");
  if (!isAnalyticsAdmin(session)) redirect("/account?error=forbidden");

  let result: Awaited<ReturnType<typeof analyticsProvider.funnel>> = {
    configured: false,
    metrics: [],
  };
  try {
    result = await analyticsProvider.funnel(30);
  } catch {
    result = { configured: false, metrics: [] };
  }

  const counts = new Map(result.metrics.map((metric) => [metric.event, metric.users]));
  const rows = funnelOrder.map((event, index) => {
    const users = counts.get(event) ?? 0;
    const previous = index === 0 ? users : (counts.get(funnelOrder[index - 1]) ?? 0);
    return {
      event,
      stage: eventStage[event],
      users,
      conversion: previous > 0 ? Math.round((users / previous) * 1000) / 10 : null,
    };
  });

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--tf-text-subtle)]">
            Internal growth telemetry
          </p>
          <h1 className="mt-3 text-3xl font-semibold">ThreatFade conversion engine</h1>
          <p className="mt-2 text-sm text-[var(--tf-text-muted)]">
            Canonical funnel · trailing 30 days
          </p>
        </div>
        <div className="rounded-full border border-[var(--tf-line)] px-3 py-1 text-xs">
          {result.configured ? "Provider connected" : "Provider not configured"}
        </div>
      </div>
      {!result.configured ? (
        <div className="mt-8 rounded-2xl border border-[var(--tf-line)] p-6 text-sm leading-7 text-[var(--tf-text-muted)]">
          Configure <code>POSTHOG_PROJECT_ID</code>, <code>POSTHOG_PROJECT_API_KEY</code> and the
          server-only <code>POSTHOG_API_KEY</code> to populate this dashboard. No analytics secret
          is exposed to the browser.
        </div>
      ) : null}
      <div className="mt-8 overflow-hidden rounded-2xl border border-[var(--tf-line)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[var(--tf-surface-muted)] text-xs uppercase tracking-wider text-[var(--tf-text-subtle)]">
            <tr>
              <th className="px-5 py-4">Funnel stage</th>
              <th className="px-5 py-4">Event</th>
              <th className="px-5 py-4 text-right">Unique users</th>
              <th className="px-5 py-4 text-right">Step conversion</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.event} className="border-t border-[var(--tf-line)]">
                <td className="px-5 py-4 capitalize">{row.stage}</td>
                <td className="px-5 py-4 font-mono text-xs">{row.event}</td>
                <td className="px-5 py-4 text-right tabular-nums">{row.users.toLocaleString()}</td>
                <td className="px-5 py-4 text-right tabular-nums">
                  {row.conversion === null ? "—" : `${row.conversion}%`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
