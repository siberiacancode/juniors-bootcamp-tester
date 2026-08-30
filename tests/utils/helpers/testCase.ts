import type { Page } from '@playwright/test';

import { cookie } from '@siberiacancode/playwright';

import { COOKIE_KEYS } from '../constants';

export const testCase = async (page: Page, caseId: string) => {
  await cookie.setItem(page, COOKIE_KEYS.TEST_CASE, caseId, {
    domain: 'localhost',
    path: '/'
  });
};
