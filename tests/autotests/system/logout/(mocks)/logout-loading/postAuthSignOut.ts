import { rest } from 'mock-config-server';

import type { BaseResponse } from '@/generated/api';

import { createBaseResponseFake } from '@/generated/api';

export const postAuthSignOut = rest.post<{
  response: BaseResponse;
}>('/auth/sign-out', createBaseResponseFake(), { delay: 3_000 });
