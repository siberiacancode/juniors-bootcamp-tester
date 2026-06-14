import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    // https://juniorsbootcamp.ru/api/rest/games.json не работает
    input: 'openapi.json',
    output: 'src/generated/api',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/lib/instance'
    },
    baseUrl: '/api',
    nameBy: 'path',
    groupBy: 'standalone',
    plugins: ['tanstack']
  }
]);
