import { eventStage, type AnalyticsEvent, type ConversionEvent } from "@/lib/analytics/taxonomy";

export type AnalyticsContext = { distinctId: string; receivedAt: string };
export type FunnelMetric = { event: ConversionEvent; users: number };

export interface AnalyticsProvider {
  capture(event: AnalyticsEvent, context: AnalyticsContext): Promise<void>;
  funnel(days: number): Promise<{ configured: boolean; metrics: FunnelMetric[] }>;
}

const DEFAULT_POSTHOG_HOST = "https://us.i.posthog.com";
const MAX_DAYS = 90;

function posthogHost() {
  return (process.env.POSTHOG_HOST ?? DEFAULT_POSTHOG_HOST).replace(/\/$/, "");
}
function clampDays(days: number) {
  if (!Number.isFinite(days)) return 30;
  return Math.min(MAX_DAYS, Math.max(1, Math.floor(days)));
}

class PostHogProvider implements AnalyticsProvider {
  async capture(event: AnalyticsEvent, context: AnalyticsContext) {
    const projectApiKey = process.env.POSTHOG_PROJECT_API_KEY;
    if (!projectApiKey) return;

    const rawProperties: Record<string, string | number | boolean | undefined> = {
      ...event.value,
      path: event.path,
      source: event.source,
      cta: event.cta,
      landing_page: event.landing_page,
      referrer: event.referrer,
      utm_source: event.utm_source,
      utm_medium: event.utm_medium,
      utm_campaign: event.utm_campaign,
      utm_content: event.utm_content,
      campaign_id: event.campaign_id,
      stage: eventStage[event.name],
      analytics_version: "17.0",
    };
    const properties = Object.fromEntries(
      Object.entries(rawProperties).filter(([, value]) => value !== undefined),
    ) as Record<string, string | number | boolean>;

    const response = await fetch(`${posthogHost()}/capture/`, {
      method: "POST",
      headers: { Authorization: `Bearer ${projectApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: projectApiKey,
        event: event.name,
        distinct_id: context.distinctId,
        properties,
        timestamp: context.receivedAt,
      }),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) throw new Error(`Analytics provider returned ${response.status}`);
  }

  async funnel(days: number) {
    const projectId = process.env.POSTHOG_PROJECT_ID;
    const queryApiKey = process.env.POSTHOG_API_KEY;
    if (!projectId || !process.env.POSTHOG_PROJECT_API_KEY || !queryApiKey)
      return { configured: false, metrics: [] };

    const safeDays = clampDays(days);
    const start = new Date(Date.now() - safeDays * 24 * 60 * 60 * 1000).toISOString();
    const events = Object.keys(eventStage) as ConversionEvent[];
    const query = `SELECT event, count(DISTINCT person_id) AS users FROM events WHERE timestamp >= '${start}' AND event IN (${events.map((event) => `'${event}'`).join(",")}) GROUP BY event ORDER BY users DESC LIMIT 100`;
    const response = await fetch(
      `${posthogHost()}/api/projects/${encodeURIComponent(projectId)}/query/`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${queryApiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
        cache: "no-store",
        redirect: "error",
        signal: AbortSignal.timeout(5000),
      },
    );
    if (!response.ok) throw new Error(`Analytics query returned ${response.status}`);
    const payload = (await response.json()) as { results?: Array<[string, number]> };
    const allowed = new Set(events);
    const metrics = (payload.results ?? [])
      .filter(
        (row): row is [string, number] =>
          Array.isArray(row) &&
          typeof row[0] === "string" &&
          typeof row[1] === "number" &&
          allowed.has(row[0] as ConversionEvent),
      )
      .map(([event, users]) => ({ event: event as ConversionEvent, users }));
    return { configured: true, metrics };
  }
}

export const analyticsProvider: AnalyticsProvider = new PostHogProvider();
