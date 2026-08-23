import { z } from "zod";

export const threatFadeVersionSchema = z.object({
  name: z.string(),
  version: z.string(),
  company: z.string(),
  license: z.string(),
});

export const threatFadeHealthSchema = z.object({
  status: z.string(),
  tool: z.string(),
  version: z.string(),
  company: z.string(),
  timestamp: z.string(),
});

export const threatFadeDetectionSchema = z.object({
  timestamp: z.string(),
  detection_id: z.number().int().nullable().optional(),
  tenant_id: z.string(),
  detected: z.boolean(),
  confidence: z.string(),
  score: z.number(),
  entropy: z.number(),
  drop_ratio: z.number(),
  z_outlier: z.number(),
  fade_start: z.number().int(),
  rules_matched: z.number().int(),
  mitre_ttp: z.string(),
  evidence: z.record(z.string(), z.unknown()),
  ml_score: z.number().nullable().optional(),
  ml_anomaly: z.boolean().nullable().optional(),
  combined_confidence: z.string().nullable().optional(),
  export_path: z.string().nullable().optional(),
});

export type ThreatFadeVersion = z.infer<typeof threatFadeVersionSchema>;
export type ThreatFadeHealth = z.infer<typeof threatFadeHealthSchema>;
export type ThreatFadeDetection = z.infer<typeof threatFadeDetectionSchema>;
