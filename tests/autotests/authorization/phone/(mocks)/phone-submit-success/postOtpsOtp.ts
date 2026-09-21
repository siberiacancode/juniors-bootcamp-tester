import { rest } from 'mock-config-server';

import type { CreateOtpDto, CreateOtpResponse } from '@/generated/api';

import { createCreateOtpResponseFake } from '@/generated/api';

export const postOtpsOtp = rest.post<{
  body: CreateOtpDto;
  response: CreateOtpResponse;
}>(
  '/otps/otp',
  createCreateOtpResponseFake({
    retryDelay: 30_000
  }),
  {
    delay: 400
  }
);
