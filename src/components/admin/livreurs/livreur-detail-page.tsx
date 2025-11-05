'use client';

import React, { useEffect } from 'react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import { LivreurInfo } from './detail/livreur-info';
import { ChargementHistory } from './detail/chargement-history';
import { User } from '@/generated/prisma';
import { TrpcLivreur } from '@/types/trpc-types';

interface LivreurDetailPageProps {
  id: string;
}

export function LivreurDetailPage({ id }: LivreurDetailPageProps) {
  const router = useRouter();
  const trpc = useTRPC();
  const { setBreadcrumb } = useBreadcrumb();

  // Fetch livreur data
  const { data: livreur, isLoading } = useQuery(trpc.livreurs.getLivreurById.queryOptions({ id }));

  useEffect(() => {
    setBreadcrumb([{ label: 'Livreurs', href: '/app/livreurs' }], livreur?.name ?? 'Livreur');
  }, [setBreadcrumb, livreur]);

  if (isLoading) {
    return <div className="p-6">Chargement...</div>;
  }

  if (!livreur) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Livreur non trouvé</h2>
          <p className="text-muted-foreground mt-2">
            Le livreur demandé n'existe pas ou a été supprimé.
          </p>
          <Button className="mt-4" onClick={() => router.push('/app/livreurs')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux livreurs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push('/app/livreurs')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{livreur.name}</h1>
            <p className="text-muted-foreground text-sm">{livreur.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Livreur Info */}
        <div className="lg:col-span-1">
          <LivreurInfo livreur={livreur} />
        </div>

        {/* Chargement History */}
        <div className="lg:col-span-2">
          <ChargementHistory chargements={livreur.chargements || []} />
        </div>
      </div>
    </div>
  );
}
