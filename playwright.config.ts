import { defineConfig, devices } from '@playwright/test';

export const TEST_TAG = {
  e2e: '@e2e',
  smoke: '@smoke',
  regression: '@regression',
  visual: '@visual',
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-qa',
    trace: 'on',
    navigationTimeout: 60_000,
    actionTimeout: 60_000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], testIdAttribute: 'data-qa' },
    },
  ],
});
