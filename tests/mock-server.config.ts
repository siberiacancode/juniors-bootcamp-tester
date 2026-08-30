import { mock, rest } from 'mock-config-server';

import requests from './(mocks)';

export default mock(
  {
    port: 3010,
    staticPath: {
      path: '/mock/static',
      prefix: '/api'
    }
  },
  ...requests,
  { configs: [rest.get('/health', 'ok')] }
);
