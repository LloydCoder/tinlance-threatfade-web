import { expect, test } from "@playwright/test";

test("homepage renders the ThreatFade product surface", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/ThreatFade/);
  await expect(page.locator("body")).toContainText("ThreatFade");
});
