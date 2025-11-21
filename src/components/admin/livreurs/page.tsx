'use client';

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LivreursTable } from './table/livreur-table';
import { Loader2 } from 'lucide-react';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';

export default function LivreursPageComponent() {
  const trpc = useTRPC();
  const { data: livreurs, isPending } = useQuery(trpc.livreurs.getLivreurs.queryOptions());

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([], 'Livreurs');
  }, [setBreadcrumb]);
  return (
    <div>
      <div className="p-4">
        {isPending ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
          </div>
        ) : (
          <LivreursTable livreurs={livreurs || []} />
        )}
      </div>
    </div>
  );
}
