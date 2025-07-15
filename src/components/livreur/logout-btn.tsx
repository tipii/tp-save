'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/external-services/better-auth/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';

const handleLogout = async () => {
  await authClient.signOut();
  redirect('/auth/login');
};

export default function LogoutBtn() {
  return <Button onClick={handleLogout}>LogOut</Button>;
}

// Bouton de déconnexion pour le livreur
