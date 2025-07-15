import { APP_LIVRAISON_ALLOWED_ROLES, authRedirect } from '@/lib/auth-redirect';
import React from 'react';

export const dynamic = 'force-dynamic';

export default async function LivreurLayout({ children }: { children: React.ReactNode }) {
  await authRedirect({
    allowedRoles: APP_LIVRAISON_ALLOWED_ROLES,
  });
  return <>{children}</>;
}
