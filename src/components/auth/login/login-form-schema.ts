import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z.email({
    message: 'Email invalide',
  }),
  password: z.string().min(8, {
    message: 'Mot de passe trop court',
  }),
  rememberMe: z.boolean().default(false).optional(),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
