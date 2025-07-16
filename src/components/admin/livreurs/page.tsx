'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { LivreursTable } from './table/livreur-table';

export default function LivreursPageComponent() {
  const trpc = useTRPC();
  const { data: livreurs } = useQuery(trpc.livreurs.getLivreurs.queryOptions());

  return (
    <div>
      <div>
        <h1>Livreurs</h1>
      </div>
      <div>
        <LivreursTable livreurs={livreurs || []} />
      </div>
    </div>
  );
}
