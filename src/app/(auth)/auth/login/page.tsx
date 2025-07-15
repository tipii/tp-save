import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from '@/components/auth/login/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Connexion',
  description:
    'Connectez-vous à votre compte Ocean 2000 Marine pour accéder à tous nos services nautiques et gérer vos commandes.',
};

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Entrez vos identifiants pour accéder à l'application</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
