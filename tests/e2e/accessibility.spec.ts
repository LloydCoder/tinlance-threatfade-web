import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const publicRoutes = ["/", "/product", "/detection", "/how-it-works", "/research", "/docs", "/playground", "/enterprise", "/security", "/integrations"];

test.describe("WCAG 2.2 AA smoke audit", () => {
  for (const route of publicRoutes) {
    test(`${route} has no automated serious accessibility violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: "networkidle" });
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((violation) => ["critical", "serious"].includes(violation.impact ?? ""));
      expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
    });
  }
});
