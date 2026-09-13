import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/detection",
  "/how-it-works",
  "/integrations",
  "/research",
  "/validation",
  "/docs",
  "/playground",
  "/pricing",
  "/enterprise",
  "/security",
];

test.describe("Sprint E public product surface", () => {
  test("required routes render without horizontal overflow", async ({ page }) => {
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("body")).toBeVisible();
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow, `horizontal overflow on ${route}`).toBe(false);
    }
  });

  test("validation and security expose evidence boundaries", async ({ page }) => {
    await page.goto("/validation");
    await expect(page.getByText("VALIDATED", { exact: true }).first()).toBeVisible();
    await expect(
      page.getByText("No independent detection validation.", { exact: true }),
    ).toBeVisible();
    await page.goto("/security");
    await expect(
      page.getByRole("heading", { name: /Security standards reference/i }),
    ).toBeVisible();
    await expect(page.getByText("Formal certification", { exact: true })).toBeVisible();
  });

  test("mobile navigation exposes validation and security", async ({ page, isMobile }) => {
    test.skip(!isMobile, "mobile navigation contract");
    await page.goto("/");
    const menu = page.getByRole("button", { name: /menu/i }).first();
    if (await menu.isVisible()) {
      await menu.click();
      await expect(page.getByRole("link", { name: "Validation" })).toBeVisible();
      await expect(page.getByRole("link", { name: "Security & Trust" })).toBeVisible();
    }
  });

  test("keyboard focus remains visible on primary navigation", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const focused = page.locator(":focus");
    await expect(focused).toBeVisible();
    const outline = await focused.evaluate((el) => getComputedStyle(el).outlineStyle);
    expect(outline).not.toBe("none");
  });

  test("public pages have no critical axe violations", async ({ page }) => {
    await page.goto("/validation");
    const results = await new AxeBuilder({ page }).analyze();
    const critical = results.violations.filter((violation) => violation.impact === "critical");
    expect(critical, JSON.stringify(critical, null, 2)).toEqual([]);
  });
});
