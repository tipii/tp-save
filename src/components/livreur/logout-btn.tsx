'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/external-services/better-auth/auth-client';
import { redirect } from 'next/navigation';
import { LogOut } from 'lucide-react';
import React from 'react';

const handleLogout = async () => {
  await authClient.signOut();
  redirect('/auth/login');
};

export default function LogoutBtn() {
  return (
    <Button onClick={handleLogout} variant="ghost" size="icon" className="text-tallin-yellow">
      <LogOut className="h-5 w-5" />
    </Button>
  );
}
