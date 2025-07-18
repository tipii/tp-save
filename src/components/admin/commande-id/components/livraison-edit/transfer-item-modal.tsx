'use client';

import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { Item } from '@/types/types';

const transferItemSchema = z.object({
  targetLivraisonId: z.string().min(1, 'Veuillez sélectionner un lot'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

export type TransferItemForm = z.infer<typeof transferItemSchema>;

interface TransferItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  sourceLivraisonId: string | null;
  availableLivraisons: Array<{ id: string; name: string | null }>;
  onTransfer: (data: TransferItemForm) => void;
}

export function TransferItemModal({
  isOpen,
  onClose,
  item,
  sourceLivraisonId,
  availableLivraisons,
  onTransfer,
}: TransferItemModalProps) {
  const form = useForm<TransferItemForm>({
    resolver: zodResolver(transferItemSchema),
    defaultValues: {
      targetLivraisonId: '',
      quantity: 1,
    },
  });

  // Update form values when item or availableLots change
  useEffect(() => {
    if (item && availableLivraisons.length > 0) {
      form.reset({
        targetLivraisonId: availableLivraisons[0]?.id || '',
        quantity: item.quantity, // Set to max quantity by default
      });
    }
  }, [item, availableLivraisons, form]);

  const handleSubmit = (data: TransferItemForm) => {
    onTransfer(data);
    form.reset();
  };

  if (!item || !sourceLivraisonId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Transférer un élément</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Élément:</strong> {item.name}
              </p>
              <p className="text-sm">
                <strong>Quantité disponible:</strong> {item.quantity}
              </p>
            </div>

            <FormField
              control={form.control}
              name="targetLivraisonId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot de destination</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un lot" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableLivraisons.map((livraison) => (
                        <SelectItem key={livraison.id} value={livraison.id}>
                          {livraison.name || `Livraison ${livraison.id}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantité à transférer</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                      min={1}
                      max={item.quantity}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2">
              <Button type="submit">Transférer</Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
