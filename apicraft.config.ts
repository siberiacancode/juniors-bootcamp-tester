import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    input: 'api.yaml',
    output: 'src/shared/api/generated',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/shared/api/instance'
    },
    baseUrl: '/api',
    nameBy: 'path',
    groupBy: 'standalone',
    plugins: ['tanstack']
  }
]);
