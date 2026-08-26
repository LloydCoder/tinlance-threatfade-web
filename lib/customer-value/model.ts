import { z } from "zod";

export const customerLifecycleEvents = [
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
] as const;

export type CustomerLifecycleEvent = (typeof customerLifecycleEvents)[number];

export const customerSnapshotSchema = z.object({
  detectionCount: z.number().int().nonnegative(),
  investigationCount: z.number().int().nonnegative(),
  dispositionCount: z.number().int().nonnegative(),
  activeMembers: z.number().int().nonnegative(),
  environmentCount: z.number().int().nonnegative(),
  integrationRequestCount: z.number().int().nonnegative(),
  customDetectionRequestCount: z.number().int().nonnegative(),
});

export type CustomerSnapshot = z.infer<typeof customerSnapshotSchema>;

export type CustomerMilestone = {
  id: string;
  label: string;
  description: string;
  complete: boolean;
};

export type ExpansionSignal = {
  id: string;
  label: string;
  rationale: string;
  severity: "info" | "opportunity";
};

export function getMilestones(snapshot: CustomerSnapshot): CustomerMilestone[] {
  return [
    {
      id: "first-detection",
      label: "First detection",
      description: "A detection has been observed in the organization workspace.",
      complete: snapshot.detectionCount > 0,
    },
    {
      id: "first-investigation",
      label: "First investigation",
      description: "An analyst has started an investigation from a detection.",
      complete: snapshot.investigationCount > 0,
    },
    {
      id: "first-disposition",
      label: "First analyst disposition",
      description: "An analyst has recorded an outcome for a detection.",
      complete: snapshot.dispositionCount > 0,
    },
    {
      id: "repeat-use",
      label: "Repeat usage",
      description: "The workspace has more than one detection to investigate over time.",
      complete: snapshot.detectionCount > 1,
    },
    {
      id: "team-adoption",
      label: "Team adoption",
      description: "More than one organization member is active.",
      complete: snapshot.activeMembers > 1,
    },
  ];
}

export function getExpansionSignals(snapshot: CustomerSnapshot): ExpansionSignal[] {
  const signals: ExpansionSignal[] = [];
  if (snapshot.activeMembers >= 3) {
    signals.push({
      id: "additional-users",
      label: "Additional users",
      rationale:
        "Three or more active members are represented; review Team or Enterprise capacity.",
      severity: "opportunity",
    });
  }
  if (snapshot.environmentCount > 1) {
    signals.push({
      id: "additional-environments",
      label: "Additional environments",
      rationale: "Multiple environments are represented; evaluate broader deployment needs.",
      severity: "opportunity",
    });
  }
  if (snapshot.detectionCount >= 25) {
    signals.push({
      id: "detection-volume",
      label: "Increased detection volume",
      rationale: "Detection volume is high enough to justify a capacity and workflow review.",
      severity: "opportunity",
    });
  }
  if (snapshot.integrationRequestCount > 0) {
    signals.push({
      id: "integration-request",
      label: "Integration request",
      rationale:
        "An integration requirement exists; validate the requirement before proposing expansion.",
      severity: "opportunity",
    });
  }
  if (snapshot.customDetectionRequestCount > 0) {
    signals.push({
      id: "custom-detection",
      label: "Custom detection request",
      rationale: "A custom detection requirement exists; route it to the custom-detection path.",
      severity: "opportunity",
    });
  }
  return signals;
}

export function healthLabel(snapshot: CustomerSnapshot) {
  const completed = getMilestones(snapshot).filter((item) => item.complete).length;
  if (completed >= 5) return "Healthy adoption";
  if (completed >= 3) return "Adoption in progress";
  if (completed >= 1) return "Activation needed";
  return "Not yet activated";
}
