import type { MockServerComponent, RestRequestConfig } from 'mock-config-server';

import { COOKIE_KEYS } from '../constants';

interface CreateTestCaseMockParams extends Omit<MockServerComponent, 'configs'> {
  caseId: string;
  configs: RestRequestConfig[];
}

export const createTestCaseMock = ({
  caseId,
  configs,
  baseUrl = '/api/tester',
  name = `case/${caseId}`,
  interceptors = []
}: CreateTestCaseMockParams): MockServerComponent => ({
  baseUrl,
  name,
  configs: configs.map((config) => ({
    ...config,
    routes: config.routes.map((route) => {
      const cookies = route.entities?.cookies;

      if (typeof cookies === 'function') {
        throw new TypeError('createTestCaseMock cannot extend a cookies comparator');
      }

      return {
        ...route,
        entities: {
          ...route.entities,
          cookies: {
            ...cookies,
            [COOKIE_KEYS.TEST_CASE]: caseId
          }
        }
      };
    })
  })),
  interceptors: [
    // rest.request.all(({ getCookie }) => {
    //   const actualCaseId = getCookie(COOKIE_KEYS.TEST_CASE);
    //   if (actualCaseId !== caseId) {
    //     throw new TypeError(`Expected test case "${caseId}", received "${actualCaseId}"`);
    //   }
    // }),
    ...interceptors
  ]
});
