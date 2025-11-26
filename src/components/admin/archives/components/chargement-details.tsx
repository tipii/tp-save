'use client';

import React from 'react';
import { useArchive } from '../context/archive-context';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Package, User, Calendar, Clock } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { formatDateForTahiti } from '@/lib/date-utils';
import { Skeleton } from '@/components/ui/skeleton';
import { statusToBadge } from '@/components/ui/enum-to-ui';
import { Status } from '@/generated/prisma';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserInitials } from '@/lib/utils';

export function ChargementDetails({ refetch }: { refetch: () => void }) {
  const { selectedChargementId } = useArchive();
  const trpc = useTRPC();

  const { data: chargement, isPending } = useQuery(
    trpc.chargements.getChargementById.queryOptions(
      { id: selectedChargementId! },
      {
        enabled: !!selectedChargementId,
      },
    ),
  );

  if (!selectedChargementId) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto mb-2 h-12 w-12" />
          <p>Sélectionnez un chargement pour voir les détails</p>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="space-y-3 p-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <Skeleton className="h-px w-full" />
        {/* Creator card */}
        <Skeleton className="h-16 w-full rounded-lg" />
        {/* Info grid */}
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
          <Skeleton className="h-16 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (!chargement) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        <p>Chargement non trouvé</p>
      </div>
    );
  }

  const creator = chargement.history?.[0]?.user;
  const createdAt = chargement.history?.[0]?.timestamp || chargement.createdAt;

  return (
    <div className="space-y-3 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{chargement.name}</h2>
        {statusToBadge(Status.DELIVERED)}
      </div>

      <Separator />

      {/* Creator Info - Most Important */}
      {creator && (
        <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 border-2 border-indigo-300">
                <AvatarFallback className="text-xs font-semibold text-indigo-700">
                  {getUserInitials(creator.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="text-xs text-indigo-600">Créé par</div>
                <div className="text-sm font-semibold text-indigo-900">{creator.name}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs text-indigo-600">
                <Clock className="h-3 w-3" />
                {new Date(createdAt).toLocaleTimeString('fr-FR', {
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Pacific/Tahiti',
                })}
              </div>
              <div className="text-xs text-indigo-700">
                {new Date(createdAt).toLocaleDateString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  timeZone: 'Pacific/Tahiti',
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compact Info Grid */}
      <div className="grid grid-cols-2 gap-2">
        {/* Livreur */}
        {chargement.livreur && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs text-blue-600">Livreur</span>
            </div>
            <p className="mt-1 flex items-center gap-2 truncate text-sm font-semibold text-blue-900">
              <Avatar className="h-8 w-8 border-2 border-blue-300">
                <AvatarFallback className="text-xs font-semibold text-blue-700">
                  {getUserInitials(chargement.livreur.name)}
                </AvatarFallback>
              </Avatar>
              {chargement.livreur.name}
            </p>
          </div>
        )}

        {/* Date de livraison */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-green-600" />
            <span className="text-xs text-green-600">Livré le</span>
          </div>
          <div className="mt-1 flex items-center gap-1">
            <span className="text-sm font-semibold text-green-900">
              {new Date(chargement.updatedAt).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                timeZone: 'Pacific/Tahiti',
              })}
            </span>
            <span className="text-xs text-green-700">
              {new Date(chargement.updatedAt).toLocaleTimeString('fr-FR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Pacific/Tahiti',
              })}
            </span>
          </div>
        </div>

        {/* Total Livraisons */}
        <div className="rounded-lg border border-purple-200 bg-purple-50 p-2">
          <div className="text-xs text-purple-600">Total</div>
          <div className="mt-1 text-xl font-bold text-purple-700">
            {chargement.livraisons?.length || 0}
          </div>
        </div>

        {/* Delivered Count */}
        <div className="rounded-lg border border-green-200 bg-green-50 p-2">
          <div className="text-xs text-green-600">Livrées</div>
          <div className="mt-1 text-xl font-bold text-green-700">
            {chargement.livraisons?.filter((l) => l.status === 'DELIVERED').length || 0}
          </div>
        </div>
      </div>
    </div>
  );
}
