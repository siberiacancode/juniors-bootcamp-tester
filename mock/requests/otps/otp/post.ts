import { rest } from 'mock-config-server';

import type { CreateOtpDto, CreateOtpResponse } from '@/generated/api';

export const postOtpsOtp = [
  rest.post<{
    body: CreateOtpDto;
    response: CreateOtpResponse;
  }>(
    '/otps/otp',
    {
      match: {
        body: {
          phone: '77777777774'
        }
      },
      handler: () => ({
        success: false,
        reason: 'Не удалось отправить код',
        retryDelay: 30_000
      })
    },
    { status: 400 }
  ),
  rest.post<{
    body: CreateOtpDto;
    response: CreateOtpResponse;
  }>('/otps/otp', {
    success: true,
    retryDelay: 30_000
  })
];
