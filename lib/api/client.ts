import { engineConfigSchema, scenarioSchema, type ThreatFadeScenario } from "@/lib/validation/engine";
import {
  threatFadeDetectionSchema,
  threatFadeHealthSchema,
  threatFadeVersionSchema,
  type ThreatFadeDetection,
  type ThreatFadeHealth,
  type ThreatFadeVersion,
} from "@/lib/api/models";

const RETRYABLE = new Set([408, 425, 429, 500, 502, 503, 504]);

export class ThreatFadeApiError extends Error {
  constructor(public readonly status: number, message: string, public readonly requestId?: string) {
    super(message);
    this.name = "ThreatFadeApiError";
  }
}

function config() {
  return engineConfigSchema.parse({
    baseUrl: process.env.THREATFADE_API_URL,
    timeoutMs: Number(process.env.THREATFADE_API_TIMEOUT_MS ?? 5000),
    maxRetries: Number(process.env.THREATFADE_API_MAX_RETRIES ?? 1),
  });
}

function endpoint(baseUrl: string, pathname: string) {
  // Path is code-owned; never concatenate user-controlled URLs into the target.
  return new URL(pathname, `${baseUrl.replace(/\/$/, "")}/`).toString();
}

async function request<T>(pathname: string, schema: { parse: (value: unknown) => T }, init?: RequestInit): Promise<T> {
  const cfg = config();
  let attempt = 0;
  while (true) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), cfg.timeoutMs);
    try {
      const response = await fetch(endpoint(cfg.baseUrl, pathname), {
        ...init,
        signal: controller.signal,
        redirect: "error",
        cache: "no-store",
        credentials: "omit",
        headers: {
          Accept: "application/json",
          ...(init?.headers ?? {}),
        },
      });
      const requestId = response.headers.get("X-Request-ID") ?? undefined;
      if (!response.ok) {
        if (attempt < cfg.maxRetries && RETRYABLE.has(response.status)) {
          attempt += 1;
          await new Promise((resolve) => setTimeout(resolve, 150 * 2 ** attempt));
          continue;
        }
        throw new ThreatFadeApiError(response.status, `ThreatFade API request failed (${response.status})`, requestId);
      }
      return schema.parse(await response.json());
    } catch (error) {
      if (error instanceof ThreatFadeApiError) throw error;
      if (attempt < cfg.maxRetries) {
        attempt += 1;
        await new Promise((resolve) => setTimeout(resolve, 150 * 2 ** attempt));
        continue;
      }
      throw new ThreatFadeApiError(503, "ThreatFade API is unavailable");
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const threatFadeApi = {
  health: (): Promise<ThreatFadeHealth> => request("/health", threatFadeHealthSchema),
  version: (): Promise<ThreatFadeVersion> => request("/version", threatFadeVersionSchema),
  scenario: (scenario: ThreatFadeScenario): Promise<ThreatFadeDetection> => {
    const parsed = scenarioSchema.parse(scenario);
    return request("/detect/scenario", threatFadeDetectionSchema, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scenario: parsed, use_ml: false, export_format: "none" }),
    });
  },
};
