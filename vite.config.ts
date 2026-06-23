import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/tester',
    plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: 'generated/router/index.gen.ts'
      }),
      react(),
      tailwindcss(),
      babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      proxy: {
        '/api/tester': {
          target: env.BACKEND_URL,
          changeOrigin: true
        }
      }
    },
    resolve: {
      tsconfigPaths: true
    }
  };
});
