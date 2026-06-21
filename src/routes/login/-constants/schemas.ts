import z from 'zod';

export const otpFieldScheme = z
  .string()
  .min(1, 'error.validation.required')
  .length(6, 'error.validation.length');
export const phoneFieldScheme = z
  .string()
  .min(1, 'error.validation.required')
  .length(11, 'error.validation.length');

export const phoneFormScheme = z.object({
  phone: phoneFieldScheme,
  otp: z.string()
});

export const otpFormScheme = z.object({
  otp: otpFieldScheme,
  phone: z.string()
});

export type LoginFormValues = z.infer<typeof phoneFormScheme>;
