import { describe, expect, it } from "vitest";
import {
  capabilityCounts,
  enterpriseCapabilities,
  enterpriseIntegrationContract,
} from "@/lib/enterprise/model";

describe("enterprise capability model", () => {
  it("keeps enterprise claims explicitly classified", () => {
    expect(enterpriseCapabilities.length).toBeGreaterThan(0);
    expect(
      enterpriseCapabilities.every((item) =>
        ["implemented", "documented", "on-demand", "not-claimed"].includes(item.status),
      ),
    ).toBe(true);
  });

  it("does not classify SAML as generally available", () => {
    const saml = enterpriseCapabilities.find((item) => item.capability === "SAML SSO");
    expect(saml?.status).toBe("on-demand");
  });

  it("provides a bounded integration contract", () => {
    expect(enterpriseIntegrationContract.map((item) => item.name)).toEqual([
      "SIEM",
      "SOAR",
      "Webhooks",
      "STIX",
      "Detection export",
    ]);
    expect(enterpriseIntegrationContract.every((item) => item.status === "contract-defined")).toBe(
      true,
    );
  });

  it("returns internally consistent status counts", () => {
    const counts = capabilityCounts();
    expect(Object.values(counts).reduce((sum, count) => sum + count, 0)).toBe(
      enterpriseCapabilities.length,
    );
  });
});
