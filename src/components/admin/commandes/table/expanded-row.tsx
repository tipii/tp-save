import React from 'react';
import { Package } from 'lucide-react';
import { type ExpandedRowProps } from './types';
import { ClientDetails } from './client-details';
import { LotCard } from './lot-card';

export function ExpandedRow({ commande }: ExpandedRowProps) {
  return (
    <div className="space-y-4 p-6">
      {/* Client Details */}
      {commande.client && <ClientDetails client={commande.client} />}

      {/* Lots Details */}
      <div className="space-y-2">
        <h4 className="flex items-center gap-2 font-medium">
          <Package className="h-4 w-4" />
          Livraison{commande.lots.length > 1 ? 's' : ''} ({commande.lots.length})
        </h4>
        {commande.lots.length > 0 ? (
          <div className="space-y-3">
            {commande.lots.map((lot, index) => (
              <LotCard key={lot.id} lot={lot} index={index} />
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
