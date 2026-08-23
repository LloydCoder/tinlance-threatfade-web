import { expect, test } from "@playwright/test";

test("homepage exposes the primary ThreatFade proposition", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /detect when attackers go quiet/i })).toBeVisible();
  await expect(page.getByRole("link", { name: /view engine/i })).toHaveAttribute(
    "href",
    "https://github.com/LloydCoder/tinlance-threatfade",
  );
});
