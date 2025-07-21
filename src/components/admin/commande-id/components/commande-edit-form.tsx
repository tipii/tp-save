'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Status } from '@/generated/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Edit, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { useCommandeEdit } from '../hooks/use-commande-edit';

const commandeUpdateSchema = z.object({
  ref: z.string().min(1, 'La référence est requise'),
  status: z.enum(Status),
});

type CommandeUpdateForm = z.infer<typeof commandeUpdateSchema>;

interface CommandeEditFormProps {
  commandeId: string;
}

export function CommandeEditForm({ commandeId }: CommandeEditFormProps) {
  const { commande, canEdit, updateCommande, mutations } = useCommandeEdit(commandeId);

  const form = useForm<CommandeUpdateForm>({
    resolver: zodResolver(commandeUpdateSchema),
    defaultValues: {
      ref: '',
      status: Status.PENDING,
    },
  });

  // Update form when commande data changes
  useEffect(() => {
    if (commande) {
      form.reset({
        ref: commande.ref,
        status: commande.status as Status,
      });
    }
  }, [commande, form]);

  const handleSave = async (data: CommandeUpdateForm) => {
    await updateCommande({
      ref: data.ref,
      status: data.status,
    });
  };

  const handleCancel = () => {
    if (commande) {
      form.reset({
        ref: commande.ref,
        status: commande.status as Status,
      });
    }
  };

  if (!commande) {
    return <div>Chargement...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Edit className="h-5 w-5" />
          Détails de la Commande
        </CardTitle>
        <CardDescription>
          {canEdit
            ? 'Document déverrouillé - Mode édition activé'
            : 'Document verrouillé - Mode lecture seule'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="ref"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Référence</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={!canEdit} placeholder="Saisir la référence" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Statut</FormLabel>
                  <Select disabled={!canEdit} onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner le statut" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Status.PENDING}>En attente</SelectItem>
                      <SelectItem value={Status.READY}>Prêt</SelectItem>
                      <SelectItem value={Status.DELIVERING}>En livraison</SelectItem>
                      <SelectItem value={Status.DELIVERED}>Livrée</SelectItem>
                      <SelectItem value={Status.CANCELLED}>Annulée</SelectItem>
                      <SelectItem value={Status.MIXED}>Mixte</SelectItem>
                      <SelectItem value={Status.TO_RETURN}>À retourner</SelectItem>
                      <SelectItem value={Status.RETURNED}>Retournée</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {canEdit && (
              <div className="flex gap-2">
                <Button type="submit" disabled={mutations.update.isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer les modifications
                </Button>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
