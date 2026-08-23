import { z } from "zod";

export const engineBaseUrlSchema = z.string().url().refine((value) => {
  const url = new URL(value);
  return url.protocol === "https:" || url.hostname === "localhost" || url.hostname === "127.0.0.1";
}, "ThreatFade API URL must use HTTPS outside local development");

export const scenarioSchema = z.enum([
  "c2_quieting",
  "lotl_gradual",
  "gnss_jam",
  "normal_with_fade",
  "mixed",
]);

export const engineConfigSchema = z.object({
  baseUrl: engineBaseUrlSchema,
  timeoutMs: z.number().int().min(500).max(15_000).default(5_000),
  maxRetries: z.number().int().min(0).max(2).default(1),
});

export type ThreatFadeScenario = z.infer<typeof scenarioSchema>;
