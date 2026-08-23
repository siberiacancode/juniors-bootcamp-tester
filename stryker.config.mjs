import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const getFiles = (directory) =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? getFiles(path) : [path];
  });

const mutate = getFiles('src')
  .filter((file) => /\.test/.test(file))
  .map((file) => file.replace('.test.', '.'))
  .filter(existsSync);

export default {
  testRunner: 'vitest',
  plugins: ['@stryker-mutator/vitest-runner'],
  mutate
};
