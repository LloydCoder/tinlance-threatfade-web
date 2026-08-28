import { describe, expect, it } from "vitest";
import { analyticsEventSchema, eventStage } from "@/lib/analytics/taxonomy";

describe("ThreatFade analytics taxonomy", () => {
  it("accepts canonical events with bounded attribution", () => {
    const result = analyticsEventSchema.safeParse({
      name: "assessment_request",
      path: "/assessment",
      source: "assessment",
      utm_source: "linkedin",
      utm_campaign: "q3-security",
      campaign_id: "tf-q3-2026",
    });
    expect(result.success).toBe(true);
    expect(eventStage.assessment_request).toBe("revenue");
  });

  it("accepts CTA click telemetry without treating a click as a conversion", () => {
    const result = analyticsEventSchema.safeParse({
      name: "cta_click",
      path: "/pricing",
      source: "pricing",
      cta: "request_assessment",
    });
    expect(result.success).toBe(true);
    expect(eventStage.cta_click).toBe("engagement");
  });

  it("accepts genuine playground completion telemetry", () => {
    const result = analyticsEventSchema.safeParse({
      name: "playground_complete",
      path: "/playground",
      source: "playground",
      value: { scenario: "c2_quieting", production_detector: false },
    });
    expect(result.success).toBe(true);
    expect(eventStage.playground_complete).toBe("activation");
  });

  it("rejects unknown events and oversized paths", () => {
    expect(analyticsEventSchema.safeParse({ name: "made_up_event", path: "/" }).success).toBe(
      false,
    );
    expect(
      analyticsEventSchema.safeParse({ name: "page_view", path: "x".repeat(513) }).success,
    ).toBe(false);
  });

  it("allows only scalar event values", () => {
    expect(
      analyticsEventSchema.safeParse({
        name: "page_view",
        path: "/",
        value: { sensitive: { nested: true } },
      }).success,
    ).toBe(false);
  });
});
