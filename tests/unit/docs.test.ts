import { describe, expect, it } from "vitest";
import { docsSections, docsVersion, getDocNavigation } from "@/config/docs";
import engineTruth from "@/content/engine-truth.json";

describe("documentation platform", () => {
  it("has the complete documented section set", () => {
    expect(docsVersion).toBe(`v${engineTruth.version}`);
    expect(docsSections.map((section) => section.slug)).toEqual([
      "getting-started",
      "installation",
      "configuration",
      "detection-packs",
      "api",
      "integrations",
      "deployment",
      "security",
      "reference",
    ]);
  });

  it("provides stable previous and next navigation", () => {
    expect(getDocNavigation("getting-started").previous).toBeUndefined();
    expect(getDocNavigation("getting-started").next?.slug).toBe("installation");
    expect(getDocNavigation("reference").next).toBeUndefined();
  });
});
