import { expect, test } from "@playwright/test";

test("authenticated SOC routes reject unauthenticated browsers", async ({ page }) => {
  await page.goto("/soc");
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByRole("heading", { name: "Sign in securely" })).toBeVisible();
});

test("SOC API proxy rejects requests without a server session", async ({ request }) => {
  const response = await request.get("/api/analyst/inbox");
  expect(response.status()).toBe(401);
});
