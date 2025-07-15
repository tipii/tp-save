import { auth } from '@/external-services/better-auth/auth';
import { APP_ALLOWED_ROLES, APP_LIVRAISON_ALLOWED_ROLES } from '@/lib/auth-redirect';
import { headers } from 'next/headers';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check if session exists
  if (!session || !session.user) {
    redirect('/auth/login');
  }

  if (session.user.role && APP_ALLOWED_ROLES.includes(session.user.role)) {
    redirect('/app');
  }

  if (session.user.role && APP_LIVRAISON_ALLOWED_ROLES.includes(session.user.role)) {
    redirect('/livreur');
  }

  notFound();
}
