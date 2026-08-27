import { z } from "zod";

export const conversionEvents = [
  "page_view",
  "cta_click",
  "research_open",
  "docs_start",
  "github_view",
  "playground_start",
  "playground_complete",
  "detection_start",
  "detection_complete",
  "signup_start",
  "signup_complete",
  "evaluation_request",
  "assessment_request",
  "pilot_request",
  "enterprise_request",
  "evaluation_qualified",
  "onboarding_started",
  "onboarding_completed",
  "first_detection",
  "first_investigation",
  "first_disposition",
  "repeat_usage",
  "pilot_started",
  "pilot_completed",
  "expansion_signal",
  "advocacy_request",
  "product_feedback_submitted",
  "customer_request",
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
  cta_click: "engagement",
  research_open: "engagement",
  docs_start: "engagement",
  github_view: "evaluation",
  playground_start: "activation",
  playground_complete: "activation",
  detection_start: "activation",
  detection_complete: "activation",
  signup_start: "evaluation",
  signup_complete: "evaluation",
  evaluation_request: "evaluation",
  assessment_request: "revenue",
  pilot_request: "revenue",
  enterprise_request: "revenue",
  evaluation_qualified: "customer",
  onboarding_started: "customer",
  onboarding_completed: "customer",
  first_detection: "customer",
  first_investigation: "customer",
  first_disposition: "customer",
  repeat_usage: "customer",
  pilot_started: "revenue",
  pilot_completed: "revenue",
  expansion_signal: "expansion",
  advocacy_request: "advocacy",
  product_feedback_submitted: "product",
  customer_request: "customer",
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
