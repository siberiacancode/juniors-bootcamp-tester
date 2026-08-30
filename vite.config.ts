import testids from '@siberiacancode/testids/vite';
import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: '/tester',
    plugins: [
      devtools(),
      testids({
        input: './tests/ids.yaml',
        output: 'generated/tests/ids.gen.ts',
        strip: mode !== 'mock'
      }),
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        generatedRouteTree: 'generated/router/index.gen.ts'
      }),
      react(),
      tailwindcss()
      // babel({ presets: [reactCompilerPreset()] })
    ],
    server: {
      proxy: {
        '/api': {
          target: env.BACKEND_URL,
          changeOrigin: true,
          configure: (proxy) => {
            proxy.on('proxyRes', (proxyResponse, request) => {
              const url = new URL(request.url ?? '', env.BACKEND_URL);
              console.log(`[vite-proxy] ${request.method} ${url} ${proxyResponse.statusCode}`);
            });

            proxy.on('error', (error, request) => {
              const url = new URL(request.url ?? '', env.BACKEND_URL);
              console.error(`[vite-proxy] ${request.method} ${url} error`, error);
            });
          }
        }
      }
    },
    resolve: {
      tsconfigPaths: true
    }
  };
});
