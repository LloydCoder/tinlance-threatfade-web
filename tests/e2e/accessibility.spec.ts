import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/product",
  "/detection",
  "/how-it-works",
  "/research",
  "/docs",
  "/playground",
  "/enterprise",
  "/security",
  "/integrations",
];

test(
  "primary public routes have no serious or critical accessibility violations",
  async ({ page }) => {
    for (const route of publicRoutes) {
      await page.goto(route, { waitUntil: "domcontentloaded" });
      const results = await new AxeBuilder({ page }).analyze();
      const serious = results.violations.filter((violation) =>
        ["critical", "serious"].includes(violation.impact ?? ""),
      );
      expect(serious, route).toEqual([]);
    }
  },
);
