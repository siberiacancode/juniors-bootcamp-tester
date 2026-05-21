import z from 'zod';

import { LENGTH } from './validation';

export const otpFormScheme = z.object({
  otp: z
    .string()
    .min(1, 'Поле обязательно для заполнения')
    .refine((data) => data.trim().length >= LENGTH.OTP, 'Код должен содержать 6 цифр')
});

export type OtpFormScheme = z.infer<typeof otpFormScheme>;

export const phoneFormScheme = z.object({
  phone: z.string().min(LENGTH.PHONE, 'Поле обязательно для заполнения')
});

export type PhoneFormScheme = z.infer<typeof phoneFormScheme>;
