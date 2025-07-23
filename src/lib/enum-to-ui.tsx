import { Badge } from '@/components/ui/badge';
import { Priority, Status } from '@/generated/prisma';

export const statusToText = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return 'En attente';
    case Status.READY:
      return 'Prêt';
    case Status.DELIVERING:
      return 'En livraison';
    case Status.DELIVERED:
      return 'Livré';
    case Status.TO_RETURN:
      return 'À retourner';
    case Status.RETURNED:
      return 'Retourné';
    case Status.CANCELLED:
      return 'Annulé';
    case Status.MIXED:
      return 'Mixte';
  }
};

export const statusToBadge = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return (
        <Badge variant="default" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.READY:
      return (
        <Badge variant="secondary" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.DELIVERING:
      return (
        <Badge variant="outline" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.DELIVERED:
      return (
        <Badge variant="green" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.TO_RETURN:
      return (
        <Badge variant="destructive" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.RETURNED:
      return (
        <Badge variant="secondary" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.CANCELLED:
      return (
        <Badge variant="destructive" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.MIXED:
      return (
        <Badge variant="outline" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
  }
};

export const priorityToText = (priority: Priority) => {
  switch (priority) {
    case Priority.URGENT:
      return 'Urgent';
    case Priority.NORMAL:
      return 'Normal';
    case Priority.ILES:
      return 'Îles';
    case Priority.UNDEFINED:
      return 'Non défini';
  }
};

export const priorityToBadge = (priority: Priority) => {
  switch (priority) {
    case Priority.URGENT:
      return <Badge variant="destructive">{priorityToText(priority)}</Badge>;
    case Priority.NORMAL:
      return <Badge variant="default">{priorityToText(priority)}</Badge>;
    case Priority.ILES:
      return <Badge variant="outline">{priorityToText(priority)}</Badge>;
    case Priority.UNDEFINED:
      return <Badge variant="secondary">{priorityToText(priority)}</Badge>;
  }
};
