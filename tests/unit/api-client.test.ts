import { afterEach, describe, expect, it } from "vitest";
import { threatFadeApi } from "@/lib/api/client";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
  delete process.env.THREATFADE_API_URL;
  delete process.env.THREATFADE_API_TIMEOUT_MS;
  delete process.env.THREATFADE_API_MAX_RETRIES;
});

describe("ThreatFade API boundary", () => {
  it("rejects a non-HTTPS production endpoint", async () => {
    process.env.THREATFADE_API_URL = "http://10.0.0.8:8080";
    await expect(threatFadeApi.health()).rejects.toThrow();
  });

  it("uses a code-owned path and rejects redirects", async () => {
    process.env.THREATFADE_API_URL = "https://engine.example.test";
    globalThis.fetch = async (input, init) => {
      expect(String(input)).toBe("https://engine.example.test/health");
      expect(init?.redirect).toBe("error");
      expect(init?.credentials).toBe("omit");
      return new Response(JSON.stringify({ status: "ok", tool: "ThreatFade", version: "0.4.0", company: "Tinlance Limited", timestamp: new Date().toISOString() }), { status: 200, headers: { "Content-Type": "application/json", "X-Request-ID": "req-test" } });
    };
    await expect(threatFadeApi.health()).resolves.toMatchObject({ version: "0.4.0" });
  });

  it("validates upstream response schemas without retrying validation failures", async () => {
    process.env.THREATFADE_API_URL = "https://engine.example.test";
    process.env.THREATFADE_API_MAX_RETRIES = "2";
    let calls = 0;
    globalThis.fetch = async () => {
      calls += 1;
      return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
    };
    await expect(threatFadeApi.health()).rejects.toThrow();
    expect(calls).toBe(1);
  });

  it("rejects oversized upstream responses", async () => {
    process.env.THREATFADE_API_URL = "https://engine.example.test";
    globalThis.fetch = async () => new Response("x".repeat(1_048_577), { status: 200 });
    await expect(threatFadeApi.health()).rejects.toThrow("exceeded the allowed size");
  });
});
