'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { RefreshCcw } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { toast } from 'sonner';

export default function RefreshButton() {
  const trpc = useTRPC();
  const { mutate } = useMutation(trpc.soapService.refreshDatabase.mutationOptions());

  const handleClick = () => {
    console.log('clicked');
    mutate(undefined, {
      onSuccess: () => {
        toast.success('Database refreshed');
      },
    });
  };

  return (
    <SidebarMenuButton onClick={handleClick}>
      <RefreshCcw />
      <span>Refetch</span>
    </SidebarMenuButton>
  );
}
