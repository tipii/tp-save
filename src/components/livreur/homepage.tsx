'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import LogoutBtn from './logout-btn';
import { useUser } from '@/hooks/use-user';
import ChargementCard from './chargerment/chargement-card';

export default function Homepage() {
  const trpc = useTRPC();
  const { user } = useUser();
  const { data: chargements } = useQuery(
    trpc.chargements.getChargementsByLivreur.queryOptions({ livreurId: user?.id ?? '' }),
  );
  return (
    <div className="flex flex-col gap-4">
      <header>
        <div className="bg-tallin-blue text-tallin-yellow flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Bonjour {user?.name}</h1>
          <LogoutBtn />
        </div>
      </header>

      <div className="flex flex-col gap-2 px-1">
        <h1 className="text-2xl font-bold">Chargement</h1>
        <div className="flex flex-col gap-2">
          {chargements?.map((chargement) => (
            <ChargementCard key={chargement.id} chargement={chargement} />
          ))}
        </div>
      </div>
    </div>
  );
}
