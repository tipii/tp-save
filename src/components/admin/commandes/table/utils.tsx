import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Loader } from 'lucide-react';
import { TrpcLotFromCommande } from '@/types/trpc-types';
import { Priority } from '@/generated/prisma';

export const getPriorityBadge = (priority: Priority, key: string) => {
  switch (priority) {
    case Priority.URGENT:
      return (
        <Badge key={key} variant="destructive" className="text-xs">
          Urgent
        </Badge>
      );
    case Priority.NORMAL:
      return (
        <Badge key={key} variant="secondary" className="text-xs">
          Normal
        </Badge>
      );
    case Priority.ILES:
      return (
        <Badge key={key} variant="default" className="text-xs">
          Îles
        </Badge>
      );
    default:
      return (
        <Badge key={key} variant="outline" className="text-xs">
          {priority}
        </Badge>
      );
  }
};

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { variant: 'outline' as const, icon: Clock, text: 'En attente' },
    ready: { variant: 'default' as const, icon: CheckCircle, text: 'Prêt' },
    delivering: { variant: 'secondary' as const, icon: Loader, text: 'En livraison' },
    delivered: { variant: 'default' as const, icon: CheckCircle, text: 'Livré' },
    cancelled: { variant: 'destructive' as const, icon: XCircle, text: 'Annulé' },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 text-xs">
      <Icon className="h-3 w-3" />
      {config.text}
    </Badge>
  );
};

export const getTotalItems = (lots: TrpcLotFromCommande[]) => {
  return lots.reduce((total, lot) => {
    if (Array.isArray(lot.items)) {
      return (
        total +
        (lot.items as { name: string; quantity: number }[]).reduce(
          (lotTotal: number, item) => lotTotal + (item.quantity || 0),
          0,
        )
      );
    }
    return total;
  }, 0);
};
