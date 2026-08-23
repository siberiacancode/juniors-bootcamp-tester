import { vitest } from '@siberiacancode/vitest';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    ...vitest,
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text'],
      exclude: ['**/*.module.css', 'tests/**']
    }
  }
});
