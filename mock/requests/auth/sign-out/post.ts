import { rest } from 'mock-config-server';

import type { BaseResponse } from '@/generated/api';

import { db } from '../../../database';

export const postAuthSignOut = rest.post<{
  response: BaseResponse;
}>('/auth/sign-out', ({ clearCookie }) => {
  clearCookie(db.tokenName, { path: '/' });

  return {
    success: true
  };
});
