import { describe, expect, it } from "vitest";
import { researchArticles } from "@/content/research";

describe("Phase 16 research catalog", () => {
  it("requires an explicit evidence class for every publication", () => {
    expect(researchArticles.length).toBeGreaterThanOrEqual(5);
    for (const article of researchArticles) {
      expect([
        "synthetic",
        "project_validation",
        "independent",
        "experimental",
        "planned",
      ]).toContain(article.evidence);
      expect(article.references.length).toBeGreaterThan(0);
    }
  });

  it("keeps the flagship study and benchmark protocol result-free", () => {
    const flagship = researchArticles.find(
      (article) => article.slug === "behavioral-fade-detection-reproducibility-study-v1",
    );
    const benchmark = researchArticles.find(
      (article) => article.slug === "behavioral-fade-benchmark-protocol-v1",
    );
    expect(flagship?.status).toBe("planned");
    expect(benchmark?.status).toBe("planned");
    expect(flagship?.evidence).toBe("planned");
    expect(benchmark?.evidence).toBe("planned");
  });

  it("does not label project validation as independent evidence", () => {
    for (const article of researchArticles.filter((article) => article.status === "validated")) {
      expect(article.evidence).toBe("project_validation");
    }
  });
});
