import { apicraft } from '@siberiacancode/apicraft';

export default apicraft([
  {
    input: 'api.yaml',
    output: 'generated/api',
    baseUrl: '/api',
    instance: 'fetches'
  }
]);
