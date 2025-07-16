'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Edit, Clock } from 'lucide-react';
import { useCommandeEdit } from '../hooks/use-commande-edit';

interface CommandeEditControlsProps {
  commandeId: string;
  commandeRef: string;
}

export function CommandeEditControls({ commandeId, commandeRef }: CommandeEditControlsProps) {
  const { editTimer, canEdit, isUnlockedByOther, isEditing, enableEdit, disableEdit } =
    useCommandeEdit(commandeId);

  const formatTimeLeft = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Commande {commandeRef}</h1>
        <p className="text-muted-foreground">ID: {commandeId}</p>
      </div>

      <div className="flex items-center gap-2">
        {editTimer && (
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <Clock className="h-4 w-4" />
            {formatTimeLeft(editTimer)}
          </div>
        )}

        {!isEditing && !isUnlockedByOther && (
          <Button onClick={enableEdit} variant="outline">
            <Unlock className="mr-2 h-4 w-4" />
            Déverrouiller & Modifier
          </Button>
        )}

        {canEdit && (
          <Button onClick={disableEdit} variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Verrouiller
          </Button>
        )}

        {isUnlockedByOther && (
          <Badge variant="destructive">
            <Edit className="mr-1 h-4 w-4" />
            En cours d'édition par un autre utilisateur
          </Badge>
        )}
      </div>
    </div>
  );
}
