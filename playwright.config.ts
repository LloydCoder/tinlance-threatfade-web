import { defineConfig, devices } from "@playwright/test";

const baseURL = "http://127.0.0.1:3000";
const testServerEnv =
  "NEXTAUTH_SECRET=threatfade-e2e-only-secret NEXTAUTH_URL=http://127.0.0.1:3000 THREATFADE_OIDC_ISSUER=http://127.0.0.1:3999 THREATFADE_OIDC_CLIENT_ID=e2e-client THREATFADE_OIDC_CLIENT_SECRET=e2e-client-secret THREATFADE_OIDC_TOKEN_URL=http://127.0.0.1:3999/token";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: { baseURL, trace: "on-first-retry" },
  projects: [
    { name: "mobile-320", use: { ...devices["Pixel 5"], viewport: { width: 320, height: 844 }, isMobile: true } },
    { name: "mobile-375", use: { ...devices["Pixel 5"], viewport: { width: 375, height: 844 }, isMobile: true } },
    { name: "mobile-390", use: { ...devices["Pixel 5"], viewport: { width: 390, height: 844 }, isMobile: true } },
    { name: "mobile-430", use: { ...devices["Pixel 5"], viewport: { width: 430, height: 932 }, isMobile: true } },
    { name: "desktop-1280", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "desktop-1440", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "desktop-1920", use: { ...devices["Desktop Chrome"], viewport: { width: 1920, height: 1080 } } },
  ],
  webServer: {
    command: process.env.CI ? `${testServerEnv} npm run start` : "npm run dev",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
