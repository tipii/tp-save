'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Item } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Package, ArrowRightLeft, Trash2, Edit, Save, X } from 'lucide-react';
import { useCommandeEdit } from '../hooks/use-commande-edit';

const itemSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

const transferSchema = z.object({
  items: z.array(itemSchema),
});

type ItemForm = z.infer<typeof itemSchema>;
type TransferForm = z.infer<typeof transferSchema>;

interface LotEditProps {
  commandeId: string;
}

export function LotEdit({ commandeId }: LotEditProps) {
  const { commande, canEdit, refetchCommande } = useCommandeEdit(commandeId);
  const [editingLot, setEditingLot] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const [transferDirection, setTransferDirection] = useState<'0to1' | '1to0'>('0to1');

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createLotMutation = useMutation(trpc.lots.createLot.mutationOptions());
  const updateLotMutation = useMutation(trpc.lots.updateLotItems.mutationOptions());
  const transferMutation = useMutation(trpc.lots.transferItems.mutationOptions());
  const deleteLotMutation = useMutation(trpc.lots.deleteLot.mutationOptions());

  const lots = commande?.lots || [];
  const parsedLots = lots.map((lot) => ({
    ...lot,
    items:
      typeof lot.items === 'string' ? (JSON.parse(lot.items) as Item[]) : (lot.items as Item[]),
  }));

  const handleCreateLot = async () => {
    try {
      await createLotMutation.mutateAsync(
        {
          commandeId,
          name: `Lot ${lots.length + 1}`,
          items: [],
        },
        {
          onSuccess: () => {
            refetchCommande();
            setShowCreateDialog(false);
            toast.success('Lot créé', {
              description: 'Le nouveau lot a été créé avec succès.',
            });
          },
        },
      );
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de créer le lot',
      });
    }
  };

  const handleUpdateLotItems = async (lotId: string, items: Item[]) => {
    try {
      await updateLotMutation.mutateAsync({
        lotId,
        items,
      });
      refetchCommande();
      setEditingLot(null);
      toast.success('Lot mis à jour', {
        description: 'Les éléments du lot ont été mis à jour avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de mettre à jour le lot',
      });
    }
  };

  const handleTransferItems = async (data: TransferForm) => {
    if (parsedLots.length !== 2) return;

    const sourceLotId = transferDirection === '0to1' ? parsedLots[0].id : parsedLots[1].id;
    const targetLotId = transferDirection === '0to1' ? parsedLots[1].id : parsedLots[0].id;

    console.log('Transfer attempt:', {
      sourceLotId,
      targetLotId,
      items: data.items,
      parsedLots,
    });

    try {
      await transferMutation.mutateAsync({
        sourceLotId,
        targetLotId,
        items: data.items,
      });
      refetchCommande();
      toast.success('Éléments transférés', {
        description: 'Les éléments ont été transférés avec succès.',
      });
    } catch (error) {
      console.error('Transfer error:', error);
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de transférer les éléments',
      });
    }
  };

  const handleDeleteLot = async (lotId: string) => {
    try {
      await deleteLotMutation.mutateAsync({ lotId });
      refetchCommande();
      toast.success('Lot supprimé', {
        description: 'Le lot a été supprimé avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: error instanceof Error ? error.message : 'Impossible de supprimer le lot',
      });
    }
  };

  if (!commande) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Gestion des lots</h3>
        <div className="flex gap-2">
          {canEdit && (
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Nouveau lot
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Créer un nouveau lot</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm">
                    Un nouveau lot vide sera créé. Vous pourrez y ajouter des éléments après sa
                    création.
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={handleCreateLot} disabled={createLotMutation.isPending}>
                      Créer le lot
                    </Button>
                    <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                      Annuler
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Transfer Interface - Show when unlocked and exactly 2 lots */}
      {canEdit && parsedLots.length === 2 && (
        <TransferInterface
          lots={parsedLots}
          onTransfer={handleTransferItems}
          transferDirection={transferDirection}
          onDirectionChange={setTransferDirection}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {parsedLots.map((lot, index) => (
          <LotCard
            key={lot.id}
            lot={lot}
            index={index}
            canEdit={canEdit}
            isEditing={editingLot === lot.id}
            onEdit={() => setEditingLot(lot.id)}
            onSave={(items) => handleUpdateLotItems(lot.id, items)}
            onCancel={() => setEditingLot(null)}
            onDelete={() => handleDeleteLot(lot.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface LotCardProps {
  lot: { id: string; name: string | null; items: Item[] };
  index: number;
  canEdit: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (items: Item[]) => void;
  onCancel: () => void;
  onDelete: () => void;
}

function LotCard({
  lot,
  index,
  canEdit,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
}: LotCardProps) {
  const [items, setItems] = useState<Item[]>(lot.items);

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1 }]);
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validItems = items.filter((item) => item.name && item.quantity > 0);
    onSave(validItems);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            {lot.name || `Lot ${index + 1}`}
          </CardTitle>
          {canEdit && (
            <div className="flex gap-1">
              {!isEditing ? (
                <Button size="sm" variant="outline" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-1">
                  <Button size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={onCancel}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
              <Button size="sm" variant="outline" onClick={onDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <div className="space-y-2">
            {items.map((item, idx) => (
              <div key={idx} className="flex gap-2">
                <Input
                  placeholder="Nom de l'article"
                  value={item.name}
                  onChange={(e) => updateItem(idx, 'name', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Qté"
                  value={item.quantity}
                  onChange={(e) => updateItem(idx, 'quantity', parseInt(e.target.value) || 0)}
                  className="w-20"
                />
                <Button size="sm" variant="outline" onClick={() => removeItem(idx)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={addItem}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un article
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {lot.items.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun article</p>
            ) : (
              lot.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-sm">{item.name}</span>
                  <Badge variant="secondary">{item.quantity}</Badge>
                </div>
              ))
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface TransferInterfaceProps {
  lots: Array<{ id: string; name: string | null; items: Item[] }>;
  onTransfer: (data: TransferForm) => void;
  transferDirection: '0to1' | '1to0';
  onDirectionChange: (direction: '0to1' | '1to0') => void;
}

function TransferInterface({
  lots,
  onTransfer,
  transferDirection,
  onDirectionChange,
}: TransferInterfaceProps) {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const sourceLot = transferDirection === '0to1' ? lots[0] : lots[1];
  const targetLot = transferDirection === '0to1' ? lots[1] : lots[0];

  const handleTransfer = () => {
    onTransfer({ items: selectedItems });
    setSelectedItems([]);
  };

  const addTransferItem = (item: Item) => {
    const existing = selectedItems.find((i) => i.name === item.name);
    if (existing) {
      setSelectedItems(
        selectedItems.map((i) =>
          i.name === item.name ? { ...i, quantity: Math.min(i.quantity + 1, item.quantity) } : i,
        ),
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const updateTransferQuantity = (itemName: string, quantity: number) => {
    setSelectedItems(selectedItems.map((i) => (i.name === itemName ? { ...i, quantity } : i)));
  };

  const removeTransferItem = (itemName: string) => {
    setSelectedItems(selectedItems.filter((i) => i.name !== itemName));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRightLeft className="h-5 w-5" />
          Transférer des éléments
        </CardTitle>
        <CardDescription>Sélectionnez les éléments à transférer entre les lots</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={transferDirection === '0to1' ? 'default' : 'outline'}
            onClick={() => onDirectionChange('0to1')}
          >
            {lots[0].name || 'Lot 1'} → {lots[1].name || 'Lot 2'}
          </Button>
          <Button
            variant={transferDirection === '1to0' ? 'default' : 'outline'}
            onClick={() => onDirectionChange('1to0')}
          >
            {lots[1].name || 'Lot 2'} → {lots[0].name || 'Lot 1'}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="mb-2 font-medium">Source: {sourceLot.name || 'Lot'}</h4>
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {sourceLot.items.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun article</p>
              ) : (
                sourceLot.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded border p-2">
                    <span className="text-sm">{item.name}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{item.quantity}</Badge>
                      <Button size="sm" variant="outline" onClick={() => addTransferItem(item)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-2 font-medium">À transférer</h4>
            <div className="max-h-48 space-y-1 overflow-y-auto">
              {selectedItems.length === 0 ? (
                <p className="text-muted-foreground text-sm">Aucun article sélectionné</p>
              ) : (
                selectedItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded border p-2">
                    <span className="flex-1 text-sm">{item.name}</span>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateTransferQuantity(item.name, parseInt(e.target.value) || 0)
                      }
                      className="h-8 w-16"
                      min={1}
                      max={sourceLot.items.find((i) => i.name === item.name)?.quantity || 1}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeTransferItem(item.name)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={handleTransfer} disabled={selectedItems.length === 0}>
            Transférer
          </Button>
          <Button variant="outline" onClick={() => setSelectedItems([])}>
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
