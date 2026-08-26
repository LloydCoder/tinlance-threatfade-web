export const demandLandingPages = {
  "c2-beaconing": {
    title: "Investigate C2 beaconing that changes when you look",
    eyebrow: "Detection engineering",
    description:
      "A focused ThreatFade path for teams evaluating behavioral changes in encrypted traffic and evasive beaconing.",
    evidence: [
      "Behavioral fade analysis",
      "Evidence-first investigation",
      "Reproducible evaluation workflow",
    ],
    cta: "Request an evaluation",
  },
  "soc-expansion": {
    title: "Give a growing SOC a behavioral detection layer",
    eyebrow: "SOC operations",
    description:
      "A practical evaluation path for security teams expanding analyst coverage without turning every anomaly into an alert.",
    evidence: [
      "Detection inbox",
      "Investigation workflow",
      "Analyst disposition and evidence provenance",
    ],
    cta: "Explore a pilot",
  },
  "siem-migration": {
    title: "Preserve behavioral detection during SIEM change",
    eyebrow: "Security architecture",
    description:
      "Evaluate ThreatFade around a migration or telemetry change while keeping detection assumptions explicit.",
    evidence: [
      "Contract-driven integration",
      "Baseline comparison",
      "Failure and degraded-telemetry testing",
    ],
    cta: "Discuss an assessment",
  },
  "encrypted-traffic": {
    title:
      "Evaluate encrypted-traffic behavior without pretending encryption is decrypted",
    eyebrow: "Network detection",
    description:
      "A research-led path for teams investigating behavioral signals available around encrypted traffic.",
    evidence: [
      "Entropy-based features",
      "Temporal behavior",
      "Explicit uncertainty and provenance",
    ],
    cta: "Review the methodology",
  },
} as const;

export type DemandLandingSlug = keyof typeof demandLandingPages;
