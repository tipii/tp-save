import React from 'react';
import { Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStatusBadge } from './utils';
import { getQueryParams, useCommandeFilters } from '../use-commande-filters';
import { toast } from 'sonner';
import { TrpcLotFromCommande } from '@/types/trpc-types';
import { Priority } from '@/generated/prisma';

export function LotCard({ lot, index }: { lot: TrpcLotFromCommande; index: number }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const filters = useCommandeFilters();
  const { refetch } = useQuery(trpc.commandes.getCommandes.queryOptions(getQueryParams(filters)));

  // Mutation for changing lot priority
  const changePriorityMutation = useMutation(
    trpc.lots.changePriority.mutationOptions({
      onSuccess: () => {
        // Invalidate the commandes query to refresh the data
        refetch();
        toast.success('Priorité modifiée avec succès');
      },
    }),
  );

  const handlePriorityChange = (priority: Priority) => {
    changePriorityMutation.mutate({ lotId: lot.id, priority });
  };

  return (
    <div className="bg-background rounded-md border p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="font-medium">{lot.name || `Lot ${index + 1}`}</div>
          <div className="flex items-center gap-2">
            {/* Priority Select */}
            <Select
              value={lot.priority || Priority.UNDEFINED}
              onValueChange={handlePriorityChange}
              disabled={changePriorityMutation.isPending}
            >
              <SelectTrigger className="h-7 w-auto text-xs" onClick={(e) => e.stopPropagation()}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Priority.URGENT}>🔴 Urgent</SelectItem>
                <SelectItem value={Priority.NORMAL}>⚪ Normal</SelectItem>
                <SelectItem value={Priority.ILES}>🏝️ Îles</SelectItem>
              </SelectContent>
            </Select>
            {getStatusBadge(lot.status)}
          </div>
        </div>
        <div className="text-muted-foreground text-sm">
          {new Date(lot.createdAt).toLocaleDateString('fr-FR')}
        </div>
      </div>

      {/* Lot Items */}
      {Array.isArray(lot.items) && lot.items.length > 0 ? (
        <div className="space-y-2">
          <h5 className="text-muted-foreground text-sm font-medium">Articles du lot:</h5>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
            {(lot.items as { name: string; quantity: number }[]).map((item, index) => (
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
