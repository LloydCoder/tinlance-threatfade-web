import { describe, expect, it } from "vitest";
import { getExpansionSignals, getMilestones, healthLabel } from "./model";

const empty = {
  detectionCount: 0,
  investigationCount: 0,
  dispositionCount: 0,
  activeMembers: 1,
  environmentCount: 1,
  integrationRequestCount: 0,
  customDetectionRequestCount: 0,
};

describe("customer value lifecycle", () => {
  it("does not claim activation before product activity", () => {
    expect(healthLabel(empty)).toBe("Not yet activated");
    expect(
      getMilestones(empty).every((item) => !item.complete || item.id === "team-adoption"),
    ).toBe(true);
  });

  it("marks core activation milestones from observed activity", () => {
    const snapshot = {
      ...empty,
      detectionCount: 2,
      investigationCount: 1,
      dispositionCount: 1,
      activeMembers: 2,
    };
    expect(
      getMilestones(snapshot)
        .filter((item) => item.complete)
        .map((item) => item.id),
    ).toEqual([
      "first-detection",
      "first-investigation",
      "first-disposition",
      "repeat-use",
      "team-adoption",
    ]);
    expect(healthLabel(snapshot)).toBe("Healthy adoption");
  });

  it("creates explainable expansion signals without automatic upgrades", () => {
    const signals = getExpansionSignals({
      ...empty,
      detectionCount: 25,
      activeMembers: 3,
      environmentCount: 2,
      integrationRequestCount: 1,
      customDetectionRequestCount: 1,
    });
    expect(signals.map((item) => item.id)).toEqual([
      "additional-users",
      "additional-environments",
      "detection-volume",
      "integration-request",
      "custom-detection",
    ]);
    expect(signals.every((item) => item.severity === "opportunity")).toBe(true);
  });
});
