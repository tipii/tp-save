'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { toast } from 'sonner';
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
import { Livraison, Priority, Status } from '@/generated/prisma';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { priorityToBadge, priorityToText, statusToBadge, statusToText } from '@/lib/enum-to-ui';
import { Label } from '@/components/ui/label';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const itemSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

const livraisonInfoSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status),
});

type ItemForm = z.infer<typeof itemSchema>;
type LivraisonInfoForm = z.infer<typeof livraisonInfoSchema>;

interface EditableLivraisonCardProps {
  livraison: Livraison & { items: Item[] };
  canEdit: boolean;
  onTransferItem: (item: Item) => void;
  availableLots: Array<{ id: string; name: string | null }>;
  refetchCommande: () => void;
}

export function EditableLivraisonCard({
  livraison,
  canEdit,
  onTransferItem,
  availableLots,
  refetchCommande,
}: EditableLivraisonCardProps) {
  const [items, setItems] = useState<Item[]>(livraison.items);
  const [isEditing, setIsEditing] = useState(false);

  const trpc = useTRPC();

  const updateLivraisonItemsMutation = useMutation(
    trpc.livraisons.updateLivraisonItems.mutationOptions(),
  );
  const deleteLivraisonMutation = useMutation(trpc.livraisons.deleteLivraison.mutationOptions());
  const updateLivraisonInfosMutation = useMutation(
    trpc.livraisons.updateLivraisonInfos.mutationOptions(),
  );

  const form = useForm<LivraisonInfoForm>({
    resolver: zodResolver(livraisonInfoSchema),
    defaultValues: {
      name: livraison.name,
      priority: livraison.priority,
      status: livraison.status,
    },
  });

  useEffect(() => {
    setItems(livraison.items);
    form.reset({
      name: livraison.name,
      priority: livraison.priority,
      status: livraison.status,
    });
  }, [livraison.items, livraison.name, livraison.priority, livraison.status, form]);

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

  const handleSave = async () => {
    const validItems = items.filter((item) => item.DL_Design && Number(item.DL_QTEBL) > 0);
    try {
      await updateLivraisonItemsMutation.mutateAsync({
        livraisonId: livraison.id,
        items: validItems,
      });
      refetchCommande();
      setIsEditing(false);
      toast.success('Livraison mise à jour', {
        description: 'Les éléments de la livraison ont été mis à jour avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de mettre à jour la livraison',
      });
    }
  };

  const handleCancel = () => {
    setItems(livraison.items);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (livraison.items.length > 0) {
      toast.error('Impossible de supprimer', {
        description:
          "La livraison contient des éléments. Veuillez les transférer ou les supprimer d'abord.",
      });
      return;
    }

    try {
      await deleteLivraisonMutation.mutateAsync({ livraisonId: livraison.id });
      refetchCommande();
      toast.success('Livraison supprimée', {
        description: 'La livraison a été supprimée avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description:
          error instanceof Error ? error.message : 'Impossible de supprimer la livraison',
      });
    }
  };

  const handleInfoSave = async (data: LivraisonInfoForm) => {
    try {
      await updateLivraisonInfosMutation.mutateAsync({
        livraisonId: livraison.id,
        ...data,
      });
      refetchCommande();

      toast.success('Livraison mise à jour', {
        description: 'La livraison a été mise à jour avec succès.',
      });
    } catch (error) {
      toast.error('Erreur', {
        description: 'Impossible de mettre à jour la livraison',
      });
    }
  };

  const handleInfoCancel = () => {
    form.reset({
      name: livraison.name,
      priority: livraison.priority,
      status: livraison.status,
    });
  };

  const canDeleteLivraison = livraison.items.length === 0;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="space-y-4">
          {/* Header with title and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <h3 className="text-muted-foreground text-sm font-medium">Livraison</h3>
            </div>
            {canEdit && (
              <div className="flex gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={form.handleSubmit(handleInfoSave)}
                      disabled={form.formState.isSubmitting}
                    >
                      <Save className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Sauvegarder les modifications</p>
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" onClick={handleInfoCancel}>
                      <X className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Réinitialiser</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
          </div>

          {/* Info Grid */}
          <Form {...form}>
            <div className="grid grid-cols-1 gap-3">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-muted-foreground text-xs font-medium">Nom</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        readOnly={!canEdit}
                        className={`h-8 text-sm transition-all ${
                          canEdit
                            ? 'border-input bg-background hover:border-primary/50 focus:border-primary'
                            : 'cursor-default border-transparent bg-transparent font-medium shadow-none'
                        }`}
                        placeholder="Nom de la livraison"
                      />
                    </FormControl>
                    {canEdit && <FormMessage />}
                  </FormItem>
                )}
              />

              {/* Priority and Status Row */}
              <div className="grid grid-cols-2 gap-4">
                {/* Priority Field */}
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground text-xs font-medium">
                        Priorité
                      </FormLabel>
                      {canEdit ? (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-input hover:border-primary/50 h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(Priority).map((priority) => (
                              <SelectItem key={priority} value={priority}>
                                {priorityToText(priority)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex h-8 items-center">
                          {priorityToBadge(livraison.priority)}
                        </div>
                      )}
                      {canEdit && <FormMessage />}
                    </FormItem>
                  )}
                />

                {/* Status Field */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-muted-foreground text-xs font-medium">
                        Statut
                      </FormLabel>
                      {canEdit ? (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-input hover:border-primary/50 h-8 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(Status).map((status) => (
                              <SelectItem key={status} value={status}>
                                {statusToText(status)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="flex h-8 items-center">
                          {statusToBadge(livraison.status)}
                        </div>
                      )}
                      {canEdit && <FormMessage />}
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </Form>
        </div>
        {canEdit && (
          <div className="flex gap-1">
            {!isEditing ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
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
                    <Button size="sm" variant="outline" onClick={handleCancel}>
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
                  onClick={handleDelete}
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
