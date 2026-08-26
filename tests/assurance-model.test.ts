import { describe, expect, it } from "vitest";
import { assuranceClaims } from "@/lib/assurance/model";

describe("Phase 20 assurance claims", () => {
  it("does not claim independent validation or certification without evidence", () => {
    const restricted = assuranceClaims.filter((claim) =>
      ["externally-validated", "independently-audited", "certified"].includes(claim.status),
    );

    expect(restricted).toHaveLength(0);
  });

  it("records explicit evidence boundaries for unvalidated claims", () => {
    const unvalidated = assuranceClaims.filter((claim) =>
      ["not-validated", "not-claimed"].includes(claim.status),
    );

    expect(unvalidated.length).toBeGreaterThan(0);
    for (const claim of unvalidated) {
      expect(claim.evidence.length).toBeGreaterThan(0);
    }
  });
});
