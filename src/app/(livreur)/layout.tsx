import { APP_LIVRAISON_ALLOWED_ROLES, authRedirect } from '@/lib/auth-redirect';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function LivreurLayout({ children }: { children: React.ReactNode }) {
  await authRedirect({
    allowedRoles: APP_LIVRAISON_ALLOWED_ROLES,
  });
  return <main className="flex min-h-screen w-full flex-col bg-slate-100 pb-40">{children}</main>;
}
