'use client';

import React from 'react';
import { CommandeEditControls } from './components/commande-edit-controls';
import { CommandeEditForm } from './components/commande-edit-form';
import { CommandeReadOnlyInfo } from './components/commande-read-only-info';
import { useCommandeEdit } from './hooks/use-commande-edit';

interface CommandeIdPageProps {
  id: string;
}

export default function CommandeIdPage({ id }: CommandeIdPageProps) {
  const { commande, isLoading } = useCommandeEdit(id);

  if (isLoading || !commande) {
    return <div className="p-6">Chargement...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header with controls */}
      <CommandeEditControls commandeId={id} commandeRef={commande.ref} />

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Editable Form */}
        <div className="lg:col-span-2">
          <CommandeEditForm commandeId={id} />
        </div>

        {/* Read-only Information */}
        <div>
          <CommandeReadOnlyInfo commandeId={id} />
        </div>
      </div>
    </div>
  );
}
