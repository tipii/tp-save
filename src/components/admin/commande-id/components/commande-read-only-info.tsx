'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Priority, Status } from '@/generated/prisma';
import ClientCard from '@/components/admin/clients/client-card';
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

      {/* Client Information */}
      {commande.client && <ClientCard client={{ ...commande.client, commandes: [] }} />}

      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">{statusToBadge(commande.status)}</div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Créée le :{' '}
                {new Date(commande.createdAt).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                Mise à jour le :{' '}
                {new Date(commande.updatedAt).toLocaleString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
