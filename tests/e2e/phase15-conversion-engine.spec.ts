import { expect, test } from "@playwright/test";

test.describe("Phase 15 conversion engine", () => {
  test("captures page view with attribution and canonical CTA event", async ({ page }) => {
    const events: Array<{ name?: string; path?: string; utm_source?: string }> = [];
    await page.route("**/api/analytics/event", async (route) => {
      if (route.request().method() === "POST") {
        try {
          const body = route.request().postDataJSON() as {
            name?: string;
            path?: string;
            utm_source?: string;
          };
          events.push(body);
        } catch {
          // Ignore malformed browser traffic in this observation handler.
        }
      }
      await route.fulfill({
        status: 202,
        contentType: "application/json",
        body: JSON.stringify({ ok: true }),
      });
    });

    await page.goto("/assessment?utm_source=playwright&utm_campaign=phase15");
    await expect(
      page.getByRole("heading", { name: /Find where your existing detection stack/i }),
    ).toBeVisible();
    await expect
      .poll(() =>
        events.some((event) => event.name === "page_view" && event.utm_source === "playwright"),
      )
      .toBe(true);

    const ctaEventRequest = page.waitForRequest((request) => {
      if (
        request.method() !== "POST" ||
        !request.url().endsWith("/api/analytics/event")
      ) {
        return false;
      }
      try {
        const body = request.postDataJSON() as { name?: string; path?: string };
        return body.name === "cta_click" && body.path === "/assessment";
      } catch {
        return false;
      }
    });
    await page.getByRole("link", { name: "Request an assessment" }).click({
      noWaitAfter: true,
    });
    const request = await ctaEventRequest;
    expect(request.postDataJSON()).toMatchObject({
      name: "cta_click",
      path: "/assessment",
    });
  });

  test("rejects malformed analytics payloads at the server boundary", async ({
    request,
    baseURL,
  }) => {
    const response = await request.post(`${baseURL}/api/analytics/event`, {
      headers: { "content-type": "application/json" },
      data: { name: "not-a-real-event", path: "/" },
    });
    expect(response.status()).toBe(400);
  });
});
