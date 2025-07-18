'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Priority, Status } from '@/generated/prisma';
import ClientCard from '@/components/clients/client-card';
import { useCommandeEdit } from '../hooks/use-commande-edit';
import { statusToBadge, priorityToBadge } from '@/lib/enum-to-ui';

interface CommandeReadOnlyInfoProps {
  commandeId: string;
}

export function CommandeReadOnlyInfo({ commandeId }: CommandeReadOnlyInfoProps) {
  const { commande } = useCommandeEdit(commandeId);

  if (!commande) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">{statusToBadge(commande.status)}</div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Créée le : {new Date(commande.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Mise à jour le : {new Date(commande.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client Information */}
      {commande.client && <ClientCard client={{ ...commande.client, commandes: [] }} />}

      {/* Lots Information */}
      {commande.lots && commande.lots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Lots ({commande.lots.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commande.lots.map((lot) => (
                <div key={lot.id} className="rounded border p-3">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{lot.name}</div>
                    <div className="flex gap-2">
                      {priorityToBadge(lot.priority)}
                      {statusToBadge(lot.status)}
                    </div>
                  </div>
                  {lot.chargement && (
                    <div className="text-muted-foreground mt-1 text-sm">
                      Chargement: {lot.chargement.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
