import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

const baseURL = process.env.E2E_BASE_URL;

if (!baseURL) {
  throw new Error('E2E_BASE_URL is required');
}

export default defineConfig({
  testDir: './autotests',
  testMatch: ['**/*.spec.ts'],
  outputDir: '../generated/tests/playwright-results/e2e/artifacts',
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/(snapshots)/{testFileName}/{arg}-{projectName}-{platform}{ext}',
  forbidOnly: !!process.env.CI,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  expect: {
    timeout: 10_000,
    toHaveScreenshot: { maxDiffPixelRatio: 0, threshold: 0.1 }
  },
  reporter: [
    ['line'],
    [
      'html',
      {
        open: 'never',
        outputFolder: '../generated/tests/playwright-results/e2e/report'
      }
    ]
  ],
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
        viewport: { height: 1080, width: 1920 }
      }
    }
  ],
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure'
  },
  workers: 1
});
