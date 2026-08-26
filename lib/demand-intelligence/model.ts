import { z } from "zod";

export const signalTypes = [
  "security_leadership_change",
  "security_hiring_surge",
  "detection_engineering_hiring",
  "soc_expansion",
  "siem_migration",
  "cloud_migration",
  "compliance_initiative",
  "security_incident",
  "funding",
  "ai_infrastructure_expansion",
] as const;

export type SignalType = (typeof signalTypes)[number];

export const buyerRoles = [
  "CISO",
  "CTO",
  "Head of Security",
  "SOC Lead",
  "Detection Engineering Lead",
  "Security Architect",
] as const;

export type BuyerRole = (typeof buyerRoles)[number];

export const signalSchema = z.object({
  type: z.enum(signalTypes),
  observedAt: z.string().datetime(),
  source: z.string().trim().min(1).max(160),
  sourceUrl: z.string().url().max(2048).optional(),
  strength: z.number().finite().min(0).max(1),
  recencyDays: z.number().int().min(0).max(3650),
  confidence: z.number().finite().min(0).max(1),
  notes: z.string().trim().max(500).optional(),
});

export const accountProfileSchema = z.object({
  accountId: z.string().trim().min(1).max(120),
  name: z.string().trim().min(1).max(160),
  website: z.string().url().max(2048).optional(),
  industry: z.string().trim().max(120).optional(),
  employeeBand: z.enum(["1-19", "20-49", "50-199", "200-499", "500-999", "1000+"]).optional(),
  geography: z.string().trim().max(120).optional(),
  buyers: z.array(z.enum(buyerRoles)).max(20).default([]),
  signals: z.array(signalSchema).max(100).default([]),
});

export type Signal = z.infer<typeof signalSchema>;
export type AccountProfile = z.infer<typeof accountProfileSchema>;

const fitWeights: Record<SignalType, number> = {
  security_leadership_change: 0.7,
  security_hiring_surge: 0.8,
  detection_engineering_hiring: 1,
  soc_expansion: 0.95,
  siem_migration: 0.9,
  cloud_migration: 0.55,
  compliance_initiative: 0.65,
  security_incident: 0.9,
  funding: 0.35,
  ai_infrastructure_expansion: 0.5,
};

const intentWeights: Record<SignalType, number> = {
  security_leadership_change: 0.25,
  security_hiring_surge: 0.45,
  detection_engineering_hiring: 0.6,
  soc_expansion: 0.55,
  siem_migration: 0.85,
  cloud_migration: 0.35,
  compliance_initiative: 0.7,
  security_incident: 0.8,
  funding: 0.2,
  ai_infrastructure_expansion: 0.3,
};

function recencyFactor(days: number) {
  return Math.exp(-days / 90);
}

function weightedSignalScore(signals: Signal[], weights: Record<SignalType, number>) {
  if (!signals.length) return 0;
  const contributions = signals.map((signal) =>
    signal.strength * signal.confidence * recencyFactor(signal.recencyDays) * weights[signal.type],
  );
  const saturation = contributions.reduce((sum, value) => sum + value, 0);
  return Math.min(1, saturation / 2.25);
}

export type DemandScore = {
  threatFadeFit: number;
  buyingIntent: number;
  signalCount: number;
  strongestSignals: Array<{ type: SignalType; contribution: number }>;
  explanation: string[];
};

export function scoreAccount(profile: AccountProfile): DemandScore {
  const threatFadeFit = weightedSignalScore(profile.signals, fitWeights);
  const buyingIntent = weightedSignalScore(profile.signals, intentWeights);
  const strongestSignals = profile.signals
    .map((signal) => ({
      type: signal.type,
      contribution:
        signal.strength * signal.confidence * recencyFactor(signal.recencyDays) * fitWeights[signal.type],
    }))
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 5);

  const explanation = strongestSignals.map(
    ({ type, contribution }) => `${type} contributes ${Math.round(contribution * 100)} points to fit; this is a relevance signal, not proof of buying intent.`,
  );
  if (!profile.signals.length) explanation.push("No signals were supplied; scores remain intentionally low.");
  return {
    threatFadeFit: Math.round(threatFadeFit * 100),
    buyingIntent: Math.round(buyingIntent * 100),
    signalCount: profile.signals.length,
    strongestSignals,
    explanation,
  };
}
