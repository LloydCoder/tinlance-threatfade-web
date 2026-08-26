import { describe, expect, it } from "vitest";
import { evaluateOutreach } from "@/lib/demand-intelligence/compliance";

describe("outreach compliance guardrails", () => {
  const base = {
    contactClass: "corporate" as const,
    hasConsent: false,
    hasExistingCustomerRelationship: false,
    lawfulBasisDocumented: true,
    suppressionListed: false,
    identityAndAddressConfigured: true,
  };

  it("blocks suppressed contacts", () => {
    expect(
      evaluateOutreach({ ...base, suppressionListed: true }).allowed,
    ).toBe(false);
  });

  it("blocks unknown subscriber classes", () => {
    expect(
      evaluateOutreach({ ...base, contactClass: "unknown" }).allowed,
    ).toBe(false);
  });

  it("requires a lawful-basis record", () => {
    const result = evaluateOutreach({ ...base, lawfulBasisDocumented: false });
    expect(result.allowed).toBe(false);
    expect(result.requiredActions.join(" ")).toMatch(/lawful basis/i);
  });

  it("does not treat a corporate signal as a permission to ignore identity and opt-out requirements", () => {
    const result = evaluateOutreach({
      ...base,
      identityAndAddressConfigured: false,
    });
    expect(result.allowed).toBe(false);
  });
});
