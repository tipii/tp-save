import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthLayout } from '@/components/auth/layout/auth-layout';
import { LoginForm } from '@/components/auth/login/login-form';

export const metadata: Metadata = {
  title: 'Connexion | Ocean 2000 Marine',
  description:
    'Connectez-vous à votre compte Ocean 2000 Marine pour accéder à tous nos services nautiques et gérer vos commandes.',
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <div className="space-y-6">
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
