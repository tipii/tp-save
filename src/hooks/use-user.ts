'use client';

import { authClient } from '@/external-services/better-auth/auth-client';

export function useUser() {
  const { data, isPending, error } = authClient.useSession();

  const user = data?.user || null;
  const session = data?.session || null;
  const isAuthenticated = !!user;

  return {
    user,
    role: user?.role,
    session,
    isPending,
    isAuthenticated,
    error,
  };
}
