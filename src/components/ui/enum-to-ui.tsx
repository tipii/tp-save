import { Badge } from '@/components/ui/badge';
import { Priority, Status } from '@/generated/prisma';
import {
  ArrowLeft,
  Check,
  CircleQuestionMark,
  Clock,
  DoorClosed,
  PackageCheck,
  Truck,
  X,
} from 'lucide-react';

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
        <Badge variant="yellow" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.READY:
      return (
        <Badge variant="yellow" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.DELIVERING:
      return (
        <Badge variant="blue" id={'status'}>
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
        <Badge variant="orange" id={'status'}>
          {statusToText(status)}
        </Badge>
      );
    case Status.RETURNED:
      return (
        <Badge variant="red" id={'status'}>
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
        <Badge variant="purple" id={'status'}>
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
      return <Badge variant="urgent">{priorityToText(priority)}</Badge>;
    case Priority.NORMAL:
      return <Badge variant="yellow">{priorityToText(priority)}</Badge>;
    case Priority.ILES:
      return <Badge variant="blue">{priorityToText(priority)}</Badge>;
    case Priority.UNDEFINED:
      return <Badge variant="default">{priorityToText(priority)}</Badge>;
  }
};

export const statusToTailwindColor = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return {
        background: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-200',
        ring: 'ring-yellow-500/20',
      };
    case Status.READY:
      return {
        background: 'bg-yellow-50',
        text: 'text-yellow-600',
        border: 'border-yellow-400',
        ring: 'ring-yellow-500/20',
      };
    case Status.DELIVERING:
      return {
        background: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        ring: 'ring-blue-500/20',
      };
    case Status.DELIVERED:
      return {
        background: 'bg-green-50',
        text: 'text-green-600',
        border: 'border-green-200',
        ring: 'ring-green-500/20',
      };
    case Status.TO_RETURN:
      return {
        background: 'bg-orange-50',
        text: 'text-orange-600',
        border: 'border-orange-200',
        ring: 'ring-orange-500/20',
      };
    case Status.RETURNED:
      return {
        background: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        ring: 'ring-red-500/20',
      };
    case Status.CANCELLED:
      return {
        background: 'bg-destructive',
        text: 'text-white',
        border: 'border-destructive',
        ring: 'ring-destructive/20',
      };
    case Status.MIXED:
      return {
        background: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        ring: 'ring-purple-500/20',
      };
  }
};

export const statusToIcon = (status: Status) => {
  switch (status) {
    case Status.PENDING:
      return <Clock size={16} />;
    case Status.READY:
      return <PackageCheck size={16} />;
    case Status.DELIVERING:
      return <Truck size={16} />;
    case Status.DELIVERED:
      return <Check size={16} />;
    case Status.TO_RETURN:
      return <ArrowLeft size={16} />;
    case Status.RETURNED:
      return <DoorClosed size={16} />;
    case Status.CANCELLED:
      return <X size={16} />;
    case Status.MIXED:
      return <CircleQuestionMark size={16} />;
  }
};
