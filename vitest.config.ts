import { vitest } from '@siberiacancode/vitest';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { defineConfig } from 'vitest/config';

const getFiles = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);

    return entry.isDirectory() ? getFiles(path) : [path];
  });

const coverageInclude = getFiles('src')
  .filter((file) => /\.(test|spec)\.(ts|tsx)$/.test(file))
  .map((file) => file.replace(/\.(test|spec)\./, '.'))
  .filter(existsSync);

export default defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  test: {
    ...vitest,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text'],
      include: coverageInclude
    }
  }
});
