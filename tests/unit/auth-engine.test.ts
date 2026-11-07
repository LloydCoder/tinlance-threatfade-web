import { afterEach, describe, expect, it, vi } from "vitest";
import { createEngineIdentitySession } from "@/lib/auth-engine";

describe("ThreatFade OIDC session exchange", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });

  it("posts an explicit empty JSON object with the OIDC bearer token", async () => {
    vi.stubEnv("THREATFADE_API_URL", "https://engine.example");
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ session_token: "opaque-session" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(createEngineIdentitySession("oidc-access-token")).resolves.toEqual({
      session_token: "opaque-session",
    });

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith(
      "https://engine.example/enterprise/identity/sessions",
      expect.objectContaining({
        method: "POST",
        body: "{}",
        headers: expect.objectContaining({
          Accept: "application/json",
          Authorization: "Bearer oidc-access-token",
          "Content-Type": "application/json",
        }),
        redirect: "error",
        cache: "no-store",
      }),
    );
  });
});
