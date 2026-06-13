import z from 'zod';

export const loginSearchSchema = z.object({
  redirect: z.string().optional().catch('')
});

export const loginCodeSearchSchema = z.object({
  phone: z.string().optional().catch(''),
  redirect: z.string().optional().catch(''),
  retryAttempt: z.coerce.number().optional().catch(0),
  retryDelay: z.coerce.number().optional().catch(0)
});

export const resolveLoginRedirect = (redirect?: string) => redirect || '/';
