import { expect, test } from "@playwright/test";

test("SOC workspace renders an investigation-first shell", async ({ page }) => {
  await page.goto("/soc");
  await expect(page.getByRole("heading", { name: "Detection inbox" })).toBeVisible();
  await expect(page.getByLabel("Search detections")).toBeVisible();
  await expect(page.getByLabel("Status")).toBeVisible();
  await expect(page.getByLabel("Sort detections")).toBeVisible();
  await expect(page.getByRole("link", { name: "Correlation view" })).toBeVisible();
});

test("analyst proxy denies unauthenticated access", async ({ request }) => {
  const response = await request.get("/api/analyst/inbox");
  expect(response.status()).toBe(401);
  await expect(response.json()).resolves.toEqual({ error: "Authentication required" });
});

test("analyst proxy rejects unsupported routes", async ({ request }) => {
  const response = await request.get("/api/analyst/admin");
  expect(response.status()).toBe(404);
});

test("analyst proxy rejects cross-origin mutations before upstream access", async ({ request }) => {
  const response = await request.patch("/api/analyst/detections/1/workflow", {
    headers: { Origin: "https://attacker.example", Authorization: "Bearer test-token" },
    data: { status: "investigating" },
  });
  expect(response.status()).toBe(401);
});
