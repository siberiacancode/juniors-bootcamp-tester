import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    input: 'https://juniorsbootcamp.ru/api/rest/games.json',
    output: 'generated/api',
    instance: {
      name: 'fetches',
      runtimeInstancePath: './src/utils/api/instance'
    },
    baseUrl: '/api',
    nameBy: 'path',
    groupBy: 'standalone',
    plugins: [
      'tanstack',
      { name: 'typescript', enums: true },
      { name: 'faker', runtimeInstancePath: './mock/faker' }
    ]
  }
]);
