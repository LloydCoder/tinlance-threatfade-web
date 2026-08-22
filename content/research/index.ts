export type ResearchStatus = "validated" | "synthetic" | "experimental" | "hypothesized" | "planned";

export type ResearchArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  published: string;
  updated?: string;
  status: ResearchStatus;
  readingTime: string;
  references: string[];
};

export const researchArticles: ResearchArticle[] = [
  {
    slug: "behavioral-fade-as-a-detection-signal",
    title: "Behavioral fade as a detection signal",
    description: "The ThreatFade detection thesis: reduced observability can be modeled as a behavioral deviation rather than assumed benign.",
    category: "Detection methodology",
    tags: ["behavioral fading", "C2", "anomaly detection"],
    author: "ThreatFade Engineering",
    published: "2026-08-23",
    status: "validated",
    readingTime: "8 min",
    references: ["ThreatFade engine README", "ThreatFade detection pipeline"],
  },
  {
    slug: "entropy-and-statistical-deviation",
    title: "Entropy and statistical deviation in the detection pipeline",
    description: "How rolling Shannon entropy and statistical deviation participate in ThreatFade's evidence-first pipeline.",
    category: "Detection science",
    tags: ["entropy", "statistics", "signal extraction"],
    author: "ThreatFade Engineering",
    published: "2026-08-23",
    status: "validated",
    readingTime: "7 min",
    references: ["ThreatFade engine README"],
  },
  {
    slug: "validation-and-benchmark-boundaries",
    title: "Validation, benchmarks and the assurance boundary",
    description: "Why deterministic benchmarks, project validation and independent assurance must remain separate evidence classes.",
    category: "Validation",
    tags: ["benchmarks", "validation", "assurance"],
    author: "ThreatFade Engineering",
    published: "2026-08-23",
    status: "validated",
    readingTime: "6 min",
    references: ["ThreatFade engine README"],
  },
];

export const researchCategories = [
  "All", "C2 behavior", "Encrypted traffic", "Entropy", "Behavioral fading", "QUIC", "Detection methodology", "Validation", "Benchmarks", "Adversarial behavior",
] as const;

export function getResearchArticle(slug: string) {
  return researchArticles.find((article) => article.slug === slug);
}
