import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, import.meta.dirname, 'VITE_');

  return {
    plugins: [
      tsconfigPaths(),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: './generated/router/index.ts'
      }),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
      tailwindcss()
    ],
    server: {
      proxy: {
        '/api': {
          target: new URL(env.VITE_API_BASE_URL).origin,
          secure: false
        }
      }
    }
  };
});
