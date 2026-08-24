import { expect, test } from "@playwright/test";

test("SOC workspace renders an investigation-first shell", async ({ page }) => {
  await page.goto("/soc");
  await expect(page.getByRole("heading", { name: "Detection inbox" })).toBeVisible();
  await expect(page.getByRole("searchbox")).toBeVisible();
  await expect(page.getByRole("combobox", { name: "Status" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Correlation view" })).toBeVisible();
});
