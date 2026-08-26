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
    });
    expect(result.success).toBe(true);
    expect(eventStage.assessment_request).toBe("revenue");
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
