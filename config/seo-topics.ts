export const seoTopics = {
  "c2-detection": {
    title: "C2 detection for adversarial activity that goes quiet",
    description:
      "How ThreatFade models C2 quieting as a behavioral change and preserves structured evidence for investigation.",
    status: "validated",
    summary:
      "ThreatFade documents C2 quieting as a detection scenario and combines signal extraction, rolling entropy, statistical deviation, rules, confidence scoring, evidence and ATT&CK mapping.",
    links: ["/detection", "/how-it-works", "/research", "/docs/detection-packs"],
  },
  "encrypted-traffic-detection": {
    title: "Encrypted traffic detection through behavioral signals",
    description:
      "A technical overview of ThreatFade's encrypted and unencrypted signal extraction and behavioral analysis model.",
    status: "validated",
    summary:
      "ThreatFade uses hybrid encrypted/unencrypted signal extraction and statistical features such as rolling Shannon entropy and z-score deviation rather than treating encryption itself as proof of malicious activity.",
    links: ["/how-it-works", "/research", "/docs/getting-started"],
  },
  "quic-c2": {
    title: "QUIC C2 detection and validation boundaries",
    description:
      "What ThreatFade documents about QUIC C2 validation, evidence and the limits of project-level testing.",
    status: "validated",
    summary:
      "The engine repository records author-confirmed validation against Merlin QUIC C2. That evidence is project validation under documented conditions, not a universal QUIC C2 detection guarantee.",
    links: ["/research", "/detection", "/docs/reference"],
  },
  "entropy-based-detection": {
    title: "Entropy-based network detection",
    description:
      "How rolling Shannon entropy participates in ThreatFade's evidence-first detection pipeline.",
    status: "validated",
    summary:
      "ThreatFade uses rolling Shannon entropy as one signal among several. Entropy changes are evidence inputs, not a standalone malware verdict.",
    links: [
      "/research/entropy-and-statistical-deviation",
      "/how-it-works",
      "/docs/detection-packs",
    ],
  },
  "multi-domain-correlation": {
    title: "Multi-domain fade correlation",
    description:
      "How ThreatFade correlates independent network, GNSS and future physical-signal observations without claiming causality.",
    status: "implemented — not production validated",
    summary:
      "ThreatFade's reusable temporal correlation layer combines canonical observations, explicit time windows, clock-skew tolerance, sensor confidence and uncertainty into evidence-backed observed correlations. The first concrete pack correlates GNSS disruption with network fade/C2 behavior.",
    links: ["/correlation", "/detection", "/research", "/docs/reference"],
  },
} as const;

export type SeoTopicSlug = keyof typeof seoTopics;
