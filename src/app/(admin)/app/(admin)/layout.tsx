import { APP_ADMIN_ALLOWED_ROLES, authRedirect } from '@/lib/auth-redirect';

export const dynamic = 'force-dynamic';

export default async function AdminOnlyLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await authRedirect({
    allowedRoles: APP_ADMIN_ALLOWED_ROLES,
  });

  return <>{children}</>;
}
