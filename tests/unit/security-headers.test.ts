import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";

describe("security headers", () => {
  it("defines a production-safe header policy", async () => {
    const headerGroups = await nextConfig.headers?.();
    const headers = headerGroups?.flatMap((group) => group.headers ?? []) ?? [];
    const values = new Map(headers.map((header) => [header.key, header.value]));

    expect(values.get("X-Content-Type-Options")).toBe("nosniff");
    expect(values.get("X-Frame-Options")).toBe("DENY");
    expect(values.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(values.get("Cross-Origin-Opener-Policy")).toBe("same-origin");
    expect(values.get("Cross-Origin-Resource-Policy")).toBe("same-origin");
    expect(values.get("Permissions-Policy")).toContain("camera=()");

    const csp = values.get("Content-Security-Policy") ?? "";
    expect(csp).toContain("default-src 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'none'");
    expect(csp).toContain("form-action 'self'");
    expect(csp).toContain("connect-src 'self'");
    expect(csp).not.toContain("connect-src 'self' https:");
  });
});
