import React from 'react';
import { Package } from 'lucide-react';
import { type ExpandedRowProps } from './types';
import { ClientDetails } from './client-details';
import { LivraisonCard } from './livraison-card';

export function ExpandedRow({ commande }: ExpandedRowProps) {
  return (
    <div className="space-y-4 p-6">
      {/* Client Details */}
      {commande.client && <ClientDetails client={commande.client} />}

      {/* Lots Details */}
      <div className="space-y-2">
        <h4 className="flex items-center gap-2 font-medium">
          <Package className="h-4 w-4" />
          Livraison{commande.livraisons.length > 1 ? 's' : ''} ({commande.livraisons.length})
        </h4>
        {commande.livraisons.length > 0 ? (
          <div className="space-y-3">
            {commande.livraisons.map((livraison, index) => (
              <LivraisonCard key={livraison.id} livraison={livraison} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-muted-foreground bg-background rounded-md border py-8 text-center">
            <Package className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p>Aucune livraison pour cette commande</p>
          </div>
        )}
      </div>
    </div>
  );
}
