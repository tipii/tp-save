'use client';

import { useState } from 'react';
import { Item } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Plus, Package, ArrowRightLeft, Trash2, Edit, Save, X } from 'lucide-react';
import { z } from 'zod';
import { Livraison, Priority } from '@/generated/prisma';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { priorityToText } from '@/lib/enum-to-ui';

const itemSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

type ItemForm = z.infer<typeof itemSchema>;

interface EditableLivraisonCardProps {
  livraison: Livraison & { items: Item[] };
  index: number;
  canEdit: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (items: Item[]) => void;
  onCancel: () => void;
  onDelete: () => void;
  onTransferItem: (item: Item) => void;
  availableLots: Array<{ id: string; name: string | null }>;
  onPriorityChange: (priority: Priority) => void;
}

export function EditableLivraisonCard({
  livraison,
  index,
  canEdit,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onDelete,
  onTransferItem,
  availableLots,
  onPriorityChange,
}: EditableLivraisonCardProps) {
  const [items, setItems] = useState<Item[]>(livraison.items);

  const addItem = () => {
    setItems([
      ...items,
      {
        AR_REF: '',
        DL_LIGNE: '',
        DL_QTEBL: '',
        DO_Piece: '',
        DL_Design: '',
        Famille_ART: '',
        Commentaires: '',
        DL_MontantHT: '',
        Commentaires2: '',
        QTE_DIFF_CMDE: '',
        DL_PrixUnitaire: '',
      },
    ]);
  };

  const updateItem = (index: number, field: keyof Item, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const validItems = items.filter((item) => item.DL_Design && Number(item.DL_QTEBL) > 0);
    onSave(validItems);
  };

  const canDeleteLivraison = livraison.items.length === 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            <Package className="h-4 w-4" />
            {livraison.name || `Livraison ${index + 1}`}
            <Select onValueChange={onPriorityChange} value={livraison.priority}>
              <SelectTrigger>
                <SelectValue placeholder="Priorité" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Priority).map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priorityToText(priority)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardTitle>
          {canEdit && (
            <div className="flex gap-1">
              {!isEditing ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={onEdit}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Modifier le lot</p>
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div className="flex gap-1">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sauvegarder les modifications</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" variant="outline" onClick={onCancel}>
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Annuler les modifications</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onDelete}
                    disabled={!canDeleteLivraison}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {canDeleteLivraison
                      ? 'Supprimer la livraison'
                      : 'La livraison doit être vide pour être supprimée'}
                  </p>
                </TooltipContent>
              </Tooltip>
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
                  value={item.DL_Design}
                  onChange={(e) => updateItem(idx, 'DL_Design', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Qté"
                  value={item.DL_QTEBL}
                  onChange={(e) => updateItem(idx, 'DL_QTEBL', e.target.value || '0')}
                  className="w-20"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="outline" onClick={() => removeItem(idx)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Supprimer cet article</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="outline" onClick={addItem}>
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un article
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ajouter un nouvel article au lot</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="space-y-2">
            {livraison.items.length === 0 ? (
              <p className="text-muted-foreground text-sm">Aucun article</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Article</TableHead>
                    <TableHead className="text-center">Quantité</TableHead>
                    {canEdit && availableLots.length > 0 && (
                      <TableHead className="text-center">Actions</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {livraison.items.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.DL_Design}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="secondary">{item.DL_QTEBL}</Badge>
                      </TableCell>
                      {canEdit && availableLots.length > 0 && (
                        <TableCell className="text-center">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => onTransferItem(item)}
                              >
                                <ArrowRightLeft className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Transférer vers un autre lot</p>
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
