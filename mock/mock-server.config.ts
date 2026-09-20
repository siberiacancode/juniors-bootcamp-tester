import { mock, rest } from 'mock-config-server';

import * as requests from './requests';

export default mock(
  {
    port: 3010,
    staticPath: {
      path: '/mock/static',
      prefix: '/api'
    },
    interceptors: [
      rest.request.all(async ({ setDelay }) => {
        await setDelay(400);
      })
    ]
  },
  {
    baseUrl: '/api/tester',
    configs: Object.values(requests).flat()
  }
);
