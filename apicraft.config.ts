import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    // https://juniorsbootcamp.ru/api/rest/games.json не работает
    input: 'openapi.json',
    output: 'generated/api',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/helpers/api/instance'
    },
    baseUrl: '/api',
    nameBy: 'path',
    groupBy: 'standalone',
    plugins: ['tanstack']
  }
]);
