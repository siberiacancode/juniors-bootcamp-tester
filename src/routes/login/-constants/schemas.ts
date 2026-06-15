import z from 'zod';

import { intl } from '@/lib';

export const LENGTH = {
  PHONE: 10,
  OTP: 6
} as const;

export const otpFieldScheme = z
  .string()
  .min(1, intl.formatMessage({ id: 'field.login.otp.required' }))
  .refine(
    (data) => data.trim().length >= LENGTH.OTP,
    intl.formatMessage({ id: 'field.login.otp.length' })
  );

export const phoneFieldScheme = z
  .string()
  .min(LENGTH.PHONE, intl.formatMessage({ id: 'field.login.phone.required' }));

export const phoneFormScheme = z.object({
  phone: phoneFieldScheme,
  otp: z.string()
});

export const otpFormScheme = z.object({
  otp: otpFieldScheme,
  phone: z.string()
});

export type LoginFormValues = z.infer<typeof phoneFormScheme>;
