import { rest } from 'mock-config-server';

import type { CreateOtpDto, CreateOtpResponse, ErrorResponse } from '@/generated/api';

export const postOtpsOtp = [
  rest.post<{
    body: CreateOtpDto;
    response: ErrorResponse;
  }>(
    '/otps/otp',
    {
      match: {
        body: {
          phone: '77777777774'
        }
      },
      response: {
        success: false,
        reason: 'Не удалось отправить код'
      }
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
