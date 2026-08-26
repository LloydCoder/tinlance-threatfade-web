export type AssuranceStatus =
  | "implemented"
  | "internally-tested"
  | "internally-validated"
  | "externally-validated"
  | "independently-audited"
  | "certified"
  | "not-validated"
  | "not-claimed";

export type AssuranceClaim = {
  claim: string;
  status: AssuranceStatus;
  evidence: string;
  limitation?: string;
};

export const assuranceClaims: AssuranceClaim[] = [
  {
    claim: "ThreatFade detection capability",
    status: "implemented",
    evidence:
      "Detection implementation exists in the engine repository and is covered by repository validation.",
  },
  {
    claim: "Detection evaluation methodology",
    status: "internally-validated",
    evidence: "Phase 16.5 defines reproducible evaluation, evidence and benchmark boundaries.",
  },
  {
    claim: "Independent detection validation",
    status: "not-validated",
    evidence: "No independent evaluator report has been attached.",
    limitation: "Do not describe internal evaluation as independent validation.",
  },
  {
    claim: "Independent penetration test",
    status: "not-validated",
    evidence:
      "A third-party penetration-test scope is prepared, but no signed independent report exists.",
    limitation: "Security testing preparation is not a completed penetration test.",
  },
  {
    claim: "Independent security audit",
    status: "not-validated",
    evidence: "No independent audit report has been attached.",
  },
  {
    claim: "Security certification or attestation",
    status: "not-claimed",
    evidence: "No certification or attestation is claimed by this release.",
  },
  {
    claim: "Independent customer-scale performance validation",
    status: "not-validated",
    evidence:
      "Scale benchmark methodology is prepared; independent reproduction has not occurred.",
  },
];

export const assuranceStatusLabel: Record<AssuranceStatus, string> = {
  implemented: "Implemented",
  "internally-tested": "Internally tested",
  "internally-validated": "Internally validated",
  "externally-validated": "Externally validated",
  "independently-audited": "Independently audited",
  certified: "Certified",
  "not-validated": "Not validated",
  "not-claimed": "Not claimed",
};
