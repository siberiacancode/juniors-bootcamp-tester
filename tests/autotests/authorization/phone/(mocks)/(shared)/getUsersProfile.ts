import { rest } from 'mock-config-server';

import type { ErrorResponse } from '@/generated/api';

import { createErrorResponseFake } from '@/generated/api';

export const getUsersProfileUnauthorized = rest.get<{
  response: ErrorResponse;
}>('/users/profile', createErrorResponseFake(), {
  status: 401
});
