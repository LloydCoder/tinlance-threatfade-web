export type EnterpriseCapabilityStatus =
  | "implemented"
  | "documented"
  | "on-demand"
  | "not-claimed";

export type EnterpriseCapability = {
  area: string;
  capability: string;
  status: EnterpriseCapabilityStatus;
  evidence: string;
  limitation?: string;
};

export const enterpriseCapabilities: EnterpriseCapability[] = [
  {
    area: "Identity",
    capability: "OIDC SSO with PKCE/state/nonce validation",
    status: "implemented",
    evidence:
      "NextAuth OIDC provider and engine enterprise session boundary are present in the web application.",
  },
  {
    area: "Identity",
    capability: "SAML SSO",
    status: "on-demand",
    evidence:
      "No SAML provider is represented in the current dependency or provider configuration.",
    limitation:
      "Do not market SAML as generally available until a validated enterprise requirement and implementation exist.",
  },
  {
    area: "Authorization",
    capability: "Organization-scoped RBAC",
    status: "implemented",
    evidence:
      "Existing authenticated organization/member and analyst boundaries are reused by enterprise workflows.",
  },
  {
    area: "Governance",
    capability: "Security/audit event contract",
    status: "documented",
    evidence:
      "Enterprise governance documentation defines required authentication, authorization, administrative-action and access-event fields.",
    limitation:
      "The public website does not claim an immutable enterprise audit-log retention service until the backing deployment provides it.",
  },
  {
    area: "Operations",
    capability: "Health, readiness and version visibility",
    status: "implemented",
    evidence:
      "Existing health/version engine boundary is exposed through the web integration architecture.",
  },
  {
    area: "Interoperability",
    capability: "SIEM/SOAR/webhook/STIX integration contract",
    status: "documented",
    evidence:
      "Enterprise integration contract defines adapter boundaries and supported output formats without inventing live connectors.",
    limitation:
      "A connector is only advertised as available after an actual adapter is deployed and tested.",
  },
  {
    area: "Assurance",
    capability: "Security and procurement evidence center",
    status: "implemented",
    evidence:
      "Public enterprise security and procurement center provides architecture, control, evidence-status and contact material.",
  },
  {
    area: "Compliance",
    capability: "Independent certification",
    status: "not-claimed",
    evidence: "No certification is asserted by this release.",
    limitation:
      "Certification/compliance status requires the relevant independent assessment or attestation.",
  },
];

export const enterpriseIntegrationContract = [
  {
    name: "SIEM",
    boundary: "server-side adapter",
    formats: ["CEF", "JSON"],
    status: "contract-defined",
  },
  {
    name: "SOAR",
    boundary: "server-side adapter",
    formats: ["JSON webhook"],
    status: "contract-defined",
  },
  {
    name: "Webhooks",
    boundary: "signed outbound event",
    formats: ["JSON"],
    status: "contract-defined",
  },
  {
    name: "STIX",
    boundary: "export adapter",
    formats: ["STIX 2.1"],
    status: "contract-defined",
  },
  {
    name: "Detection export",
    boundary: "versioned API/export",
    formats: ["JSON"],
    status: "contract-defined",
  },
] as const;

export function capabilityCounts() {
  return enterpriseCapabilities.reduce<Record<EnterpriseCapabilityStatus, number>>(
    (counts, item) => {
      counts[item.status] += 1;
      return counts;
    },
    { implemented: 0, documented: 0, "on-demand": 0, "not-claimed": 0 },
  );
}
