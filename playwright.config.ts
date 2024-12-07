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
    actionTimeout: 5 * 60 * 1000,
    navigationTimeout: 5 * 60 * 1000,
    baseURL: 'https://automationexercise.com',
    screenshot: 'only-on-failure',
    testIdAttribute: 'data-qa',
    trace: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], testIdAttribute: 'data-qa' },
    },
  ],
});
