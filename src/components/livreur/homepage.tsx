'use client';

import React from 'react';
import LogoutBtn from './logout-btn';
import { useUser } from '@/hooks/use-user';
import ChargementCard from './chargerment/chargement-card';
import { useCurrentChargement } from './hooks/queries';
import { PackageOpen, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

      <div className="flex flex-col gap-2 px-2">
        {/* <h1 className="text-2xl font-bold">Chargement</h1> */}
        <div className="flex min-h-[300px] flex-col gap-2">
          {isLoading && (
            <Card className="border-dashed">
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4 py-8">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                <p className="text-muted-foreground text-center">Chargement en cours...</p>
              </CardContent>
            </Card>
          )}
          {!isLoading && !chargement && (
            <Card className="border-dashed">
              <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4 py-8">
                <div className="rounded-full bg-blue-50 p-4">
                  <PackageOpen className="h-12 w-12 text-blue-500" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Aucun chargement</h3>
                  <p className="text-muted-foreground text-sm">
                    Pas de chargement attribué pour le moment
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
          {chargement && <ChargementCard chargement={chargement} />}
        </div>
      </div>
    </div>
  );
}
