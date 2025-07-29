'use client';

import React from 'react';
import LogoutBtn from './logout-btn';
import { useUser } from '@/hooks/use-user';
import ChargementCard from './chargerment/chargement-card';
import { useCurrentChargement } from './hooks/queries';

export default function Homepage() {
  const { data: chargement, isLoading, refetch } = useCurrentChargement();
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-4">
      <header>
        <div className="bg-tallin-blue text-tallin-yellow flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Bonjour {user?.name}</h1>
          <LogoutBtn />
        </div>
      </header>

      <div className="flex flex-col gap-2 px-1">
        {/* <h1 className="text-2xl font-bold">Chargement</h1> */}
        <div className="flex min-h-[300px] flex-col gap-2">
          {isLoading && (
            <div className="flex h-full items-center justify-center">En cours de chargement...</div>
          )}
          {!isLoading && !chargement && (
            <div className="flex h-full items-center justify-center">
              Pas de chargement attribué pour le moment
            </div>
          )}
          {chargement && <ChargementCard chargement={chargement} />}
        </div>
      </div>
    </div>
  );
}
