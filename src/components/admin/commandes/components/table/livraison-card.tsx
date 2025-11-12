import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { priorityToText, statusToBadge } from '@/components/ui/enum-to-ui';
import { getQueryParams, useCommandeFilters } from '../../hooks/use-commande-filters';
import { toast } from 'sonner';
import { TrpcLivraisonFromCommande } from '@/types/trpc-types';
import { Priority } from '@/generated/prisma';
import { Label } from '@/components/ui/label';

export function LivraisonCard({
  livraison,
  index,
}: {
  livraison: TrpcLivraisonFromCommande;
  index: number;
}) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const filters = useCommandeFilters();
  const { refetch } = useQuery(trpc.commandes.getCommandes.queryOptions(getQueryParams(filters)));

  // Mutation for changing lot priority
  const changePriorityMutation = useMutation(
    trpc.livraisons.changePriority.mutationOptions({
      onSuccess: () => {
        // Invalidate the commandes query to refresh the data
        refetch();
        toast.success('Priorité modifiée avec succès');
      },
    }),
  );

  const handlePriorityChange = (priority: Priority) => {
    changePriorityMutation.mutate({ livraisonId: livraison.id, priority });
  };

  return (
    <div className="bg-background rounded-md border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="font-medium">{livraison.name || `Livraison ${index + 1}`}</div>
          <div className="flex items-center gap-8 rounded-md bg-blue-50 p-2">
            {/* Priority Select */}
            <div className="flex items-center gap-2">
              <Label htmlFor="priority">Priorité</Label>
              <Select
                value={livraison.priority || Priority.UNDEFINED}
                onValueChange={handlePriorityChange}
                disabled={changePriorityMutation.isPending}
              >
                <SelectTrigger
                  className="h-7 w-auto text-xs"
                  onClick={(e) => e.stopPropagation()}
                  id={'priority'}
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={Priority.UNDEFINED}>
                    {priorityToText(Priority.UNDEFINED)}
                  </SelectItem>
                  <SelectItem value={Priority.URGENT}>{priorityToText(Priority.URGENT)}</SelectItem>
                  <SelectItem value={Priority.NORMAL}>{priorityToText(Priority.NORMAL)}</SelectItem>
                  <SelectItem value={Priority.ILES}>{priorityToText(Priority.ILES)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="status">Statut</Label>
              {statusToBadge(livraison.status)}
            </div>
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {new Date(livraison.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* LivraisonItems */}
      {Array.isArray(livraison.items) && livraison.items.length > 0 ? (
        <div className="space-y-2">
          <h5 className="text-muted-foreground text-sm font-medium">Articles du lot:</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(livraison.items as { name: string; quantity: number }[]).map((item, index) => (
              <div
                key={index}
                className="bg-muted/50 flex items-center justify-between rounded p-2"
              >
                <span className="truncate text-sm font-medium">{item.name}</span>
                <Badge variant="outline" className="text-xs">
                  {item.quantity}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-muted-foreground py-4 text-center">
          <Package className="mx-auto mb-2 h-6 w-6 opacity-50" />
          <p className="text-sm">Aucun article dans ce lot</p>
        </div>
      )}
    </div>
  );
}
