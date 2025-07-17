'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Lock, Unlock, Edit, Clock } from 'lucide-react';
import { useCommandeEdit } from '../hooks/use-commande-edit';

interface CommandeEditControlsProps {
  commandeId: string;
  commandeRef: string;
}

export function CommandeEditControls({ commandeId, commandeRef }: CommandeEditControlsProps) {
  const { commande, canEdit, isUnlockedByOther, isEditing, enableEdit, disableEdit } =
    useCommandeEdit(commandeId);

  const formatUnlockTime = (lockedUntil: Date | string) => {
    const unlockTime = typeof lockedUntil === 'string' ? new Date(lockedUntil) : lockedUntil;
    return unlockTime.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Commande {commandeRef}</h1>
        <p className="text-muted-foreground">ID: {commandeId}</p>
      </div>

      <div className="flex items-center gap-2">
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

        {isUnlockedByOther && commande?.lockedUntil && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge variant="destructive" className="cursor-help">
                <Clock className="mr-1 h-4 w-4" />
                En cours d'édition par un autre utilisateur
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sera déverrouillé à {formatUnlockTime(commande.lockedUntil)}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
