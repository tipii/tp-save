'use client';

import React from 'react';
import LogoutBtn from './logout-btn';
import { useUser } from '@/hooks/use-user';
import ChargementCard from './chargerment/chargement-card';
import { useActiveChargement, useAvailableChargements } from './hooks/queries';
import { PackageOpen, Loader2, Truck, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Homepage() {
  const { data: activeChargement, isLoading: isLoadingActive } = useActiveChargement();
  const { data: availableChargements, isLoading: isLoadingAvailable } = useAvailableChargements();
  const { user } = useUser();

  const isLoading = isLoadingActive || isLoadingAvailable;
  const hasActiveChargement = !!activeChargement;
  const hasAvailableChargements = !!availableChargements && availableChargements.length > 0;

  return (
    <div className="flex flex-col gap-4">
      <header>
        <div className="bg-tallin-blue text-tallin-yellow flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Bonjour {user?.name}</h1>
          <LogoutBtn />
        </div>
      </header>

      <div className="flex flex-col gap-4 px-2">
        {/* Loading State */}
        {isLoading && (
          <Card className="border-dashed">
            <CardContent className="flex min-h-[300px] flex-col items-center justify-center gap-4 py-8">
              <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              <p className="text-muted-foreground text-center">Chargement en cours...</p>
            </CardContent>
          </Card>
        )}

        {/* Active Chargement Section */}
        {!isLoading && hasActiveChargement && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2">
              <Truck className="h-5 w-5 text-green-600" />
              <h2 className="text-lg font-semibold text-green-700">Chargement en cours</h2>
            </div>
            <ChargementCard chargement={activeChargement} />
          </div>
        )}

        {/* Available Chargements Section - Only show if NO active chargement */}
        {!isLoading && !hasActiveChargement && hasAvailableChargements && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-2">
              <Package className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-blue-700">
                Chargements disponibles ({availableChargements.length})
              </h2>
            </div>
            {availableChargements.map((chargement) => (
              <ChargementCard key={chargement.id} chargement={chargement} />
            ))}
          </div>
        )}

        {/* Empty State - No active and no available chargements */}
        {!isLoading && !hasActiveChargement && !hasAvailableChargements && (
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
      </div>
    </div>
  );
}
