import { z } from 'zod';
import { Item } from '@/types/types';

export const itemSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

export const transferItemSchema = z.object({
  targetLotId: z.string().min(1, 'Veuillez sélectionner un lot'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

export type ItemForm = z.infer<typeof itemSchema>;
export type TransferItemForm = z.infer<typeof transferItemSchema>;

export interface LotEditProps {
  commandeId: string;
}

export interface LotCardProps {
  lot: { id: string; name: string | null; items: Item[] };
  index: number;
  canEdit: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (items: Item[]) => void;
  onCancel: () => void;
  onDelete: () => void;
  onTransferItem: (item: Item) => void;
  availableLots: Array<{ id: string; name: string | null }>;
}

export interface TransferItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  sourceLotId: string | null;
  availableLots: Array<{ id: string; name: string | null }>;
  onTransfer: (data: TransferItemForm) => void;
}
