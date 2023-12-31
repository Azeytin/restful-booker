import type { PlaywrightTestConfig } from "@playwright/test";

require("dotenv").config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    actionTimeout: 0,
    screenshot: "only-on-failure",
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "retain-on-failure",
    trace: "on",
    extraHTTPHeaders: { playwright: "yes" },
  },

  outputDir: "test-results/",
};

export default config;
