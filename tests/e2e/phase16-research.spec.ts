import { expect, test } from "@playwright/test";

test.describe("Phase 16 research scale", () => {
  test("research index exposes search and evidence metadata", async ({ page }) => {
    await page.goto("/research");
    await expect(
      page.getByRole("heading", {
        name: "Evidence, methodology and the limits of the evidence.",
      }),
    ).toBeVisible();
    await expect(page.getByPlaceholder(/Search research/i)).toBeVisible();
    await expect(page.getByText("Planned").first()).toBeVisible();
    await page.getByPlaceholder(/Search research/i).fill("reproducibility");
    await expect(
      page.getByRole("heading", {
        name: /Behavioral Fade Detection Reproducibility Study/i,
      }),
    ).toBeVisible();
  });

  test("challenge page preserves the evidence boundary", async ({ page }) => {
    await page.goto("/research/challenge");
    await expect(
      page.getByRole("heading", {
        name: /Can you detect the fade without cheating the evidence/i,
      }),
    ).toBeVisible();
    await expect(page.getByText(/leaderboard not yet populated/i).first()).toBeVisible();
    await expect(page.getByText(/cannot establish universal detection accuracy/i)).toBeVisible();
  });
});
