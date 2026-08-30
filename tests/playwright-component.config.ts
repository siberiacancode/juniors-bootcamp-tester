import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig({
  testDir: './cases',
  testMatch: ['**/?(*.)component.[jt]s?(x)'],
  outputDir: '../generated/tests/playwright-results/component',
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
      {
        open: 'never',
        outputFolder: '../generated/tests/playwright-results/reports/component/html'
      }
    ],
    ['json', { outputFile: '../generated/tests/playwright-results/reports/component/report.json' }]
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
    ctPort: 3100,
    ctCacheDir: './(wrapper)/ct-cache',
    ctTemplateDir: './(wrapper)',
    ctViteConfig: {
      resolve: {
        tsconfigPaths: true
      },
      plugins: [react(), tailwindcss()],
      server: {
        proxy: {
          '/api': {
            target: 'http://localhost:3010',
            changeOrigin: true
          }
        }
      }
    },
    trace: 'on-first-retry'
  },
  webServer: {
    cwd: '..',
    command: 'pnpm exec mcs --config ./tests/mock-server.config.ts',
    url: 'http://localhost:3010/health/',
    reuseExistingServer: true,
    timeout: 120_000
  }
});
