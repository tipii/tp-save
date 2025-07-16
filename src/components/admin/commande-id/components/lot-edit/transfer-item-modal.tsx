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
  targetLotId: z.string().min(1, 'Veuillez sélectionner un lot'),
  quantity: z.number().min(1, 'La quantité doit être supérieure à 0'),
});

export type TransferItemForm = z.infer<typeof transferItemSchema>;

interface TransferItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item | null;
  sourceLotId: string | null;
  availableLots: Array<{ id: string; name: string | null }>;
  onTransfer: (data: TransferItemForm) => void;
}

export function TransferItemModal({
  isOpen,
  onClose,
  item,
  sourceLotId,
  availableLots,
  onTransfer,
}: TransferItemModalProps) {
  const form = useForm<TransferItemForm>({
    resolver: zodResolver(transferItemSchema),
    defaultValues: {
      targetLotId: '',
      quantity: 1,
    },
  });

  // Update form values when item or availableLots change
  useEffect(() => {
    if (item && availableLots.length > 0) {
      form.reset({
        targetLotId: availableLots[0]?.id || '',
        quantity: item.quantity, // Set to max quantity by default
      });
    }
  }, [item, availableLots, form]);

  const handleSubmit = (data: TransferItemForm) => {
    onTransfer(data);
    form.reset();
  };

  if (!item || !sourceLotId) return null;

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
              name="targetLotId"
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
                      {availableLots.map((lot) => (
                        <SelectItem key={lot.id} value={lot.id}>
                          {lot.name || `Lot ${lot.id}`}
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
