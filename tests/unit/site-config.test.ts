import { describe, expect, it } from "vitest";
import { siteConfig } from "@/config/site";

describe("site configuration", () => {
  it("uses the canonical ThreatFade domains", () => {
    expect(siteConfig.url).toBe("https://threatfade.com");
    expect(siteConfig.github).toBe("https://github.com/LloydCoder/tinlance-threatfade");
  });
});
