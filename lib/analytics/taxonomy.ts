import { z } from "zod";

export const conversionEvents = [
  "page_view",
  "research_open",
  "docs_start",
  "github_view",
  "playground_start",
  "detection_start",
  "detection_complete",
  "signup_start",
  "signup_complete",
  "evaluation_request",
  "assessment_request",
  "pilot_request",
  "enterprise_request",
] as const;

export type ConversionEvent = (typeof conversionEvents)[number];

const optionalShortString = z.string().trim().min(1).max(160).optional();
const optionalUrl = z.string().url().max(2048).optional();

export const analyticsEventSchema = z.object({
  name: z.enum(conversionEvents),
  path: z.string().trim().min(1).max(512),
  source: optionalShortString,
  cta: optionalShortString,
  landing_page: optionalShortString,
  referrer: optionalUrl,
  utm_source: optionalShortString,
  utm_medium: optionalShortString,
  utm_campaign: optionalShortString,
  utm_content: optionalShortString,
  campaign_id: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[A-Za-z0-9._:-]+$/)
    .optional(),
  value: z
    .record(z.string(), z.union([z.string().max(160), z.number().finite(), z.boolean()]))
    .optional(),
});

export type AnalyticsEvent = z.infer<typeof analyticsEventSchema>;

export const eventStage: Record<ConversionEvent, string> = {
  page_view: "acquisition",
  research_open: "engagement",
  docs_start: "engagement",
  github_view: "evaluation",
  playground_start: "activation",
  detection_start: "activation",
  detection_complete: "activation",
  signup_start: "evaluation",
  signup_complete: "evaluation",
  evaluation_request: "evaluation",
  assessment_request: "revenue",
  pilot_request: "revenue",
  enterprise_request: "revenue",
};

export const publicAnalyticsProperties = [
  "path",
  "source",
  "cta",
  "landing_page",
  "referrer",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "campaign_id",
  "stage",
] as const;

export function sanitizeAnalyticsEvent(input: unknown): AnalyticsEvent {
  return analyticsEventSchema.parse(input);
}
