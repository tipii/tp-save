'use client';

import React, { useEffect } from 'react';
import { CommandeEditForm } from './components/commande-edit-form';
import { CommandeReadOnlyInfo } from './components/commande-read-only-info';
import { LivraisonEdit } from './components/livraison-edit/livraison-edit';
import { useCommandeEdit } from './hooks/use-commande-edit';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';

interface CommandeIdPageProps {
  id: string;
}

export default function CommandeIdPage({ id }: CommandeIdPageProps) {
  const { commande, isLoading, refetchCommande } = useCommandeEdit(id);
  const { setBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    setBreadcrumb([{ label: 'Commandes', href: '/app/commandes' }], commande?.name ?? 'Commande');
  }, [setBreadcrumb, commande]);

  if (isLoading || !commande) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Commande {commande.name}</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Editable Form */}
        <div className="lg:col-span-2">
          <CommandeEditForm commandeId={id} />
          <LivraisonEdit commandeId={id} />
        </div>

        {/* Read-only Information */}
        <div>
          <CommandeReadOnlyInfo commandeId={id} />
        </div>
      </div>
    </div>
  );
}
