import { rest } from 'mock-config-server';

import type { CreateOtpDto, CreateOtpResponse } from '@/generated/api';

import { VALID_PHONE } from '../../../(helpers)';
import { COOKIE_KEYS } from '../../../../../utils/constants';
import { CASE_ID } from '../constants';

export const postOtpsOtp = rest.post<{
  body: CreateOtpDto;
  response: CreateOtpResponse;
}>(
  '/otps/otp',
  {
    match: {
      cookies: {
        [COOKIE_KEYS.TEST_CASE]: CASE_ID
      },
      body: {
        phone: VALID_PHONE
      }
    },
    response: {
      success: true,
      retryDelay: 30_000
    }
  },
  { delay: 400 }
);
