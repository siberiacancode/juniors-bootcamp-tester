import { defineConfig, devices } from '@playwright/experimental-ct-react';
import testids from '@siberiacancode/testids/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig({
  testDir: './cases',
  testMatch: ['**/?(*.)component.[jt]s?(x)'],
  outputDir: './playwright-results/component',
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
    ['html', { open: 'never', outputFolder: './playwright-results/reports/component/html' }],
    ['json', { outputFile: './playwright-results/reports/component/report.json' }]
  ],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  use: {
    ctPort: 3100,
    ctCacheDir: './playwright/ct-cache',
    ctTemplateDir: './playwright',
    ctViteConfig: {
      resolve: {
        tsconfigPaths: true
      },
      plugins: [
        react(),
        tailwindcss(),
        testids({
          input: './ids.yaml',
          output: 'generated/tests/ids.gen.ts'
        })
      ]
    },
    trace: 'on-first-retry'
  }
});
