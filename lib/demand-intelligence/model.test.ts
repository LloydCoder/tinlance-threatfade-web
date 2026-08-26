import { describe, expect, it } from "vitest";
import { scoreAccount, type AccountProfile } from "@/lib/demand-intelligence/model";

const profile = (signals: AccountProfile["signals"]): AccountProfile => ({
  accountId: "acme",
  name: "Acme",
  buyers: [],
  signals,
});

describe("demand intelligence scoring", () => {
  it("keeps empty accounts at zero", () => {
    const result = scoreAccount(profile([]));
    expect(result.threatFadeFit).toBe(0);
    expect(result.buyingIntent).toBe(0);
  });

  it("separates fit from buying intent", () => {
    const result = scoreAccount(profile([{ type: "detection_engineering_hiring", observedAt: "2026-08-26T12:00:00.000Z", source: "test", strength: 1, confidence: 1, recencyDays: 0 }]));
    expect(result.threatFadeFit).toBeGreaterThan(result.buyingIntent);
  });

  it("decays stale signals", () => {
    const fresh = scoreAccount(profile([{ type: "siem_migration", observedAt: "2026-08-26T12:00:00.000Z", source: "test", strength: 1, confidence: 1, recencyDays: 0 }]));
    const stale = scoreAccount(profile([{ type: "siem_migration", observedAt: "2026-08-26T12:00:00.000Z", source: "test", strength: 1, confidence: 1, recencyDays: 365 }]));
    expect(fresh.threatFadeFit).toBeGreaterThan(stale.threatFadeFit);
    expect(fresh.buyingIntent).toBeGreaterThan(stale.buyingIntent);
  });

  it("caps scores at 100", () => {
    const signals = Array.from({ length: 20 }, (_, index) => ({ type: "security_incident" as const, observedAt: "2026-08-26T12:00:00.000Z", source: `test-${index}`, strength: 1, confidence: 1, recencyDays: 0 }));
    const result = scoreAccount(profile(signals));
    expect(result.threatFadeFit).toBeLessThanOrEqual(100);
    expect(result.buyingIntent).toBeLessThanOrEqual(100);
  });
});
