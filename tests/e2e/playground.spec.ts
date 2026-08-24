import { expect, test } from "@playwright/test";

test.describe("playground", () => {
  test("renders the safe curated boundary", async ({ page }) => {
    await page.goto("/playground");
    await expect(page.getByRole("heading", { name: /See behavioral fading/i })).toBeVisible();
    await expect(page.getByText("production engine: isolated")).toBeVisible();

    await page.getByRole("button", { name: /LOTL gradual fade/i }).click();
    await expect(page.getByText("source-pattern visualization")).toBeVisible();
    await expect(page.getByText("no detection verdict")).toBeVisible();
  });

  test("rejects hostile playground input", async ({ request }) => {
    const response = await request.post("/api/playground", {
      data: { scenario: "../../etc/passwd", command: "id" },
    });
    expect(response.status()).toBe(400);
  });
});
