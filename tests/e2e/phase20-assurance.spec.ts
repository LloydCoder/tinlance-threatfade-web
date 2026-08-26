import { expect, test } from "@playwright/test";

test("independent assurance page exposes evidence boundaries", async ({ page }) => {
  await page.goto("/enterprise/assurance");
  await expect(page.getByRole("heading", { name: /evidence that stops/i })).toBeVisible();
  await expect(page.getByText("Not validated", { exact: true })).toHaveCount(4);
  await expect(page.getByText("Not claimed", { exact: true })).toHaveCount(1);
  await expect(page.getByText(/No independent penetration test/i)).toBeVisible();
});
