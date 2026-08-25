import { describe, expect, it } from "vitest";
import { safeCallbackUrl, sessionCookieName } from "@/lib/auth-security";

describe("authenticated platform security", () => {
  it("allows only same-origin callback URLs", () => {
    expect(safeCallbackUrl("/soc", "https://app.example")).toBe("https://app.example/soc");
    expect(safeCallbackUrl("https://app.example/account", "https://app.example")).toBe("https://app.example/account");
    expect(safeCallbackUrl("https://evil.example/steal", "https://app.example")).toBe("https://app.example/soc");
    expect(safeCallbackUrl("//evil.example/steal", "https://app.example")).toBe("https://app.example/soc");
  });

  it("uses a secure cookie prefix in production", () => {
    expect(sessionCookieName(true)).toBe("__Secure-threatfade.session-token");
    expect(sessionCookieName(false)).toBe("threatfade.session-token");
  });
});
