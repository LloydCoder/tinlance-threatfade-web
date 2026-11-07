import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { designSystem } from "@/config/design-system";

describe("official ThreatFade brand identity", () => {
  it("uses the approved Signal Trace palette and typography", () => {
    expect(designSystem.brand.mark).toBe("Signal Trace");
    expect(designSystem.color.navy).toBe("#0B1220");
    expect(designSystem.color.navyRaised).toBe("#16233B");
    expect(designSystem.color.mist).toBe("#E6EDF3");
    expect(designSystem.color.paper).toBe("#F4F6F8");
    expect(designSystem.color.signal).toBe("#F5A524");
    expect(designSystem.color.signalOnLight).toBe("#C27200");
    expect(designSystem.typography.display).toBe("Inter");
    expect(designSystem.typography.mono).toBe("JetBrains Mono");
  });

  it("renders the official mark instead of a retyped TF logo tile", () => {
    const header = readFileSync("components/navigation/site-header.tsx", "utf8");
    expect(header).toContain("/brand/threatfade-mark-on-dark.svg");
    expect(header).not.toMatch(/>\s*TF\s*</);
    expect(header).not.toContain("THREATFADE</span>");
  });

  it("uses the brand palette and available SVG favicon in global metadata", () => {
    const css = readFileSync("app/globals.css", "utf8");
    const layout = readFileSync("app/layout.tsx", "utf8");
    const manifest = readFileSync("app/manifest.ts", "utf8");
    expect(css).toContain("--tf-signal: #F5A524");
    expect(css).not.toContain("#b8ff5a");
    expect(layout).toContain('url: "/favicon.svg"');
    expect(manifest).toContain('src: "/favicon.svg"');
    expect(manifest).not.toContain("android-chrome-");
  });
});
