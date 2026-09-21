import { createUserFake } from '@/generated/api';

export const VALID_PHONE = '77777777771';
export const VALID_OTP = '123456';

export const AUTHORIZATION_TOKEN = 'authorization-otp-token';
export const AUTHORIZATION_USER = createUserFake({
  phone: VALID_PHONE
});
