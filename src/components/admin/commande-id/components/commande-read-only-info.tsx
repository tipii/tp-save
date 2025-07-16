'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { Priority, Status } from '@/types/enums';
import ClientCard from '@/components/clients/client-card';
import { useCommandeEdit } from '../hooks/use-commande-edit';

interface CommandeReadOnlyInfoProps {
  commandeId: string;
}

export function CommandeReadOnlyInfo({ commandeId }: CommandeReadOnlyInfoProps) {
  const { commande } = useCommandeEdit(commandeId);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case Priority.URGENT:
        return 'destructive';
      case Priority.ILES:
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case Status.READY:
        return 'default';
      case Status.DELIVERING:
        return 'secondary';
      default:
        return 'outline';
    }
  };

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
          <div className="flex items-center gap-2">
            <Badge variant={getPriorityColor(commande.priority)}>{commande.priority}</Badge>
            <Badge variant={getStatusColor(commande.status)}>{commande.status}</Badge>
          </div>

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
                <div key={lot.id} className="rounded border p-2">
                  <div className="font-medium">Lot {lot.name}</div>
                  {lot.chargement && (
                    <div className="text-muted-foreground text-sm">
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
