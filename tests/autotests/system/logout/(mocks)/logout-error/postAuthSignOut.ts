import { rest } from 'mock-config-server';

import type { ErrorResponse } from '@/generated/api';

import { createErrorResponseFake } from '@/generated/api';

export const postAuthSignOut = rest.post<{
  response: ErrorResponse;
}>('/auth/sign-out', createErrorResponseFake());
