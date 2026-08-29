import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './cases',
  testMatch: ['**/?(*.)browser.[jt]s?(x)'],
  outputDir: './playwright-results/browser',
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/(snapshots)/{testFileName}/{arg}-{projectName}-{platform}{ext}',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  timeout: 30_000,
  expect: {
    timeout: 10_000
  },
  reporter: [
    ['line'],
    ['html', { open: 'never', outputFolder: './playwright-results/reports/browser/html' }],
    ['json', { outputFile: './playwright-results/reports/browser/report.json' }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  use: {
    baseURL: 'http://localhost:5173/tester/',
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'pnpm dev-mock',
    url: 'http://localhost:5173/tester/',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
