import z from 'zod';
import { createTRPCRouter, adminProcedure } from '../init';
import { auth } from '@/external-services/better-auth/auth';
import { TRPCError } from '@trpc/server';
import { headers } from 'next/headers';
import { Role } from '@/lib/constants';

export const usersRouter = createTRPCRouter({
  getUsers: adminProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        banned: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: [
        {
          banned: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
    return users;
  }),

  getUserById: adminProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findUnique({
      where: { id: input.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phoneNumber: true,
        phoneNumberVerified: true,
        banned: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Utilisateur non trouvé',
      });
    }

    return user;
  }),

  createUser: adminProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Le nom est requis'),
        email: z.string().email('Email invalide'),
        password: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
        role: z.nativeEnum(Role),
        phoneNumber: z.string().optional(),
        banned: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // check if email or phone number is already taken
        const existingUser = await ctx.prisma.user.findFirst({
          where: {
            OR: [{ email: input.email }, { phoneNumber: input.phoneNumber }],
          },
        });
        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'Email ou numéro de téléphone déjà utilisé',
          });
        }

        const result = await auth.api.createUser({
          body: {
            email: input.email, // required
            password: input.password, // required
            name: input.name, // required
            role: input.role as 'admin' | 'secretariat' | 'livreur', // ROLE TO UPDATE IF MORE ROLES ARE ADDED
          },
        });

        if (result?.user) {
          await ctx.prisma.user.update({
            where: { id: result.user.id },
            data: {
              role: input.role || null,
              phoneNumber: input.phoneNumber || null,

              banned: input.banned || null,
            },
          });
        }

        return { success: true, user: result?.user };
      } catch (error) {
        console.error(error);
        //check if user as been
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error ? error.message : "Erreur lors de la création de l'utilisateur",
        });
      }
    }),

  updateUser: adminProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().min(1, 'Le nom est requis').optional(),
        email: z.string().email('Email invalide').optional(),
        role: z.string().optional(),
        phoneNumber: z.string().optional(),
        username: z.string().optional(),
        displayUsername: z.string().optional(),
        banned: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const user = await ctx.prisma.user.update({
          where: { id: input.id },
          data: {
            name: input.name,
            email: input.email,
            role: input.role,
            phoneNumber: input.phoneNumber || null,
            username: input.username || null,
            displayUsername: input.displayUsername || null,
            banned: input.banned,
          },
        });

        return { success: true, user };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: "Erreur lors de la mise à jour de l'utilisateur",
        });
      }
    }),

  updatePassword: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        newPassword: z.string().min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Get the user's account
        const account = await ctx.prisma.account.findFirst({
          where: {
            userId: input.userId,
            providerId: 'credential',
          },
        });

        if (!account) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Compte utilisateur non trouvé',
          });
        }

        const data = await auth.api.setUserPassword({
          body: {
            newPassword: input.newPassword, // required
            userId: input.userId, // required
          },
          // This endpoint requires session cookies.

          headers: await headers(),
        });

        return { success: true };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : 'Erreur lors de la mise à jour du mot de passe',
        });
      }
    }),

  deleteUser: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.delete({
          where: { id: input.id },
        });

        return { success: true };
      } catch (error) {
        console.error(error);
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            error instanceof Error
              ? error.message
              : "Erreur lors de la suppression de l'utilisateur",
        });
      }
    }),
});
