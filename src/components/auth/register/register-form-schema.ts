import { z } from 'zod';

export const registerFormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, {
        message: 'Le prénom doit contenir au moins 2 caractères',
      })
      .refine((s) => !s.includes(' '), "Le prénom ne doit pas contenir d'espace"),
    lastName: z
      .string()
      .min(2, {
        message: 'Le nom doit contenir au moins 2 caractères',
      })
      .refine((s) => !s.includes(' '), "Le nom ne doit pas contenir d'espace"),
    email: z.string().email({
      message: 'Email invalide',
    }),
    phone: z.string(),

    password: z
      .string()
      .min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
      .regex(/[A-Z]/, { message: 'Le mot de passe doit contenir au moins une majuscule' })
      .regex(/[0-9]/, { message: 'Le mot de passe doit contenir au moins un chiffre' }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Vous devez accepter les conditions générales',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  });

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
