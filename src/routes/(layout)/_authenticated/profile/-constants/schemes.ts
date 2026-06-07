import z from 'zod';

export const profileFormScheme = z.object({
  lastname: z.string(),
  firstname: z.string(),
  // middlename: z.string(),
  email: z.string()
  // city: z.string()
});

export type ProfileFormScheme = z.infer<typeof profileFormScheme>;
