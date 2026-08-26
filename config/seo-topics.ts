export const seoTopics = {
  "behavioral-threat-detection": {
    title: "Behavioral threat detection for reduced observability",
    description:
      "How ThreatFade models changes in observable behavior as evidence for analyst review rather than treating reduced activity as automatically benign.",
    status: "validated",
    summary:
      "ThreatFade's evidence-first thesis focuses on behavioral deviation, structured evidence and analyst review. It does not claim that behavioral change alone proves maliciousness.",
    links: ["/research/behavioral-fade-as-a-detection-signal", "/how-it-works", "/detection"],
  },
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
  "network-threat-hunting": {
    title: "Network threat hunting with behavioral evidence",
    description:
      "A practical ThreatFade research path from observable network behavior to evidence-backed analyst investigation.",
    status: "implemented — evidence boundaries apply",
    summary:
      "ThreatFade provides structured detection evidence, investigation workflow and interoperable outputs; research claims remain bounded by the available validation evidence.",
    links: ["/soc", "/research", "/docs/reference"],
  },
  "detection-engineering": {
    title: "Detection engineering and versioned ThreatFade detection packs",
    description:
      "How ThreatFade structures detection packs, evidence, ATT&CK mapping and a research-to-production lifecycle.",
    status: "validated",
    summary:
      "ThreatFade detection packs use stable identifiers and versioning. The intended lifecycle is Research → Backtest → Canary → Production → Deprecated.",
    links: ["/docs/detection-packs", "/research", "/detection"],
  },
  "beaconing-detection": {
    title: "Beaconing and behavioral fade detection",
    description:
      "How ThreatFade approaches quieting and evasive beacon behavior as temporal behavioral evidence.",
    status: "validated thesis; validation scope applies",
    summary:
      "ThreatFade is designed around detecting deliberate reductions in observable behavior, with entropy/statistical features and structured evidence feeding analyst review.",
    links: ["/research/behavioral-fade-as-a-detection-signal", "/detection", "/playground"],
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
