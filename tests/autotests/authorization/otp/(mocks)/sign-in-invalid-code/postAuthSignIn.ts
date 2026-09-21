import { rest } from 'mock-config-server';

import type { ErrorResponse, SignInDto } from '@/generated/api';

import { createErrorResponseFake } from '@/generated/api';

export const postAuthSignIn = rest.post<{
  body: SignInDto;
  response: ErrorResponse;
}>('/auth/sign-in', createErrorResponseFake(), {
  status: 400
});
