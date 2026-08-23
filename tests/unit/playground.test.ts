import { describe, expect, it } from "vitest";
import { getPlaygroundDataset, playgroundRequestSchema } from "@/lib/playground";

describe("playground security boundary", () => {
  it("accepts only known scenario identifiers", () => {
    expect(playgroundRequestSchema.safeParse({ scenario: "c2_quieting" }).success).toBe(true);
    expect(playgroundRequestSchema.safeParse({ scenario: "../../etc/passwd" }).success).toBe(false);
    expect(playgroundRequestSchema.safeParse({ scenario: "c2_quieting", command: "rm -rf /" }).success).toBe(false);
  });
  it("returns deterministic curated data without detection verdicts", () => {
    const result = getPlaygroundDataset("c2_quieting");
    expect(result.execution).toBe("website-only-curated");
    expect(result.values).toHaveLength(64);
    expect(result.stages.find((x) => x.id === "detection")?.state).toBe("not-executed");
  });
  it("does not expose arbitrary upload semantics", () => {
    const result = getPlaygroundDataset("normal_with_fade");
    expect(result.note).toContain("No detection verdict");
  });
});
