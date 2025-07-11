import { authClient } from '@/external-services/better-auth/auth-client';
import { useUser } from '@/hooks/use-user';
import React from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { LayoutDashboard, Loader2, LogOut, User } from 'lucide-react';
import Link from 'next/link';

export default function HeaderLogin() {
  const { user, isPending } = useUser();

  const handleSignOut = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.warning('Vous avez été déconnecté');
        },
      },
    });
  };

  if (isPending) {
    return (
      <Button variant="ghost" size="icon">
        <Loader2 className="h-5 w-5 animate-spin" />
      </Button>
    );
  }

  if (user?.role === 'admin') {
    return (
      <Link href="/admin">
        <Button variant="ghost">
          <LayoutDashboard className="h-5 w-5" /> Administration
        </Button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {user ? (
        <>
          <Link href="/mon-compte">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Mon compte</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Me déconnecter</span>
          </Button>
        </>
      ) : (
        <Link href="/auth/login">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Me connecter</span>
          </Button>
        </Link>
      )}
    </div>
  );
}
