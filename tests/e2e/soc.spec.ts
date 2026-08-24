import { expect, test } from "@playwright/test";

test("SOC workspace renders an investigation-first shell", async ({ page }) => {
  await page.goto("/soc");
  await expect(page.getByRole("heading", { name: "Detection inbox" })).toBeVisible();
  await expect(page.getByLabel("Search detections")).toBeVisible();
  await expect(page.getByLabel("Status")).toBeVisible();
  await expect(page.getByRole("link", { name: "Correlation view" })).toBeVisible();
});
