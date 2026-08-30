import { defineConfig, devices } from '@playwright/test';
import process from 'node:process';

export default defineConfig({
  testDir: './cases',
  testMatch: ['**/?(*.)browser.[jt]s?(x)'],
  outputDir: '../generated/tests/playwright-results/browser',
  snapshotPathTemplate:
    '{testDir}/{testFileDir}/(snapshots)/{testFileName}/{arg}-{projectName}-{platform}{ext}',
  forbidOnly: !!process.env.CI,
  fullyParallel: true,
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
      { open: 'never', outputFolder: '../generated/tests/playwright-results/reports/browser/html' }
    ],
    ['json', { outputFile: '../generated/tests/playwright-results/reports/browser/report.json' }]
  ],
  projects: [
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: 1,
        viewport: { height: 1080, width: 1920 }
      }
    },
    {
      name: 'mobile chrome',
      use: {
        ...devices['Galaxy S24']
      }
    },
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //     deviceScaleFactor: 1,
    //     viewport: { height: 1080, width: 1920 }
    //   }
    // },
    // {
    //   name: 'mobile firefox',
    //   use: {
    //     ...devices['Galaxy S24'],
    //     browserName: 'firefox'
    //   }
    // },
    {
      name: 'safari',
      use: {
        ...devices['Desktop Safari'],
        deviceScaleFactor: 1,
        viewport: { height: 1080, width: 1920 }
      }
    },
    {
      name: 'mobile safari',
      use: {
        ...devices['iPhone 15 Pro']
      }
    }
  ],
  use: {
    baseURL: 'http://localhost:5173/tester/',
    screenshot: 'only-on-failure',
    trace: 'on-first-retry'
  },
  webServer: [
    {
      cwd: '..',
      command: 'pnpm exec mcs --config ./tests/mock-server.config.ts',
      url: 'http://localhost:3010/health/',
      reuseExistingServer: true,
      timeout: 120_000
    },
    {
      cwd: '..',
      command:
        'pnpm exec vite build --mode mock && pnpm exec vite preview --host 0.0.0.0 --port 5173 --strictPort --mode mock',
      port: 5173,
      reuseExistingServer: true,
      timeout: 120_000
    }
  ]
});
