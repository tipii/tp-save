'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';
import { Priority, Status } from '@/types/enums';
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
  priority: z.enum([Priority.URGENT, Priority.NORMAL, Priority.ILES]),
  status: z.enum([Status.PENDING, Status.READY, Status.DELIVERING]),
  originalItems: z.string().optional(),
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
      priority: Priority.NORMAL,
      status: Status.PENDING,
      originalItems: '',
    },
  });

  // Update form when commande data changes
  useEffect(() => {
    if (commande) {
      form.reset({
        ref: commande.ref,
        priority: commande.priority as Priority,
        status: commande.status as Status,
        originalItems: commande.originalItems
          ? JSON.stringify(commande.originalItems, null, 2)
          : '',
      });
    }
  }, [commande, form]);

  const handleSave = async (data: CommandeUpdateForm) => {
    let originalItems;
    if (data.originalItems) {
      try {
        originalItems = JSON.parse(data.originalItems);
      } catch (e) {
        toast.error('JSON invalide', {
          description: 'Les éléments originaux doivent être au format JSON valide',
        });
        return;
      }
    }

    await updateCommande({
      ref: data.ref,
      priority: data.priority,
      status: data.status,
      originalItems,
    });
  };

  const handleCancel = () => {
    if (commande) {
      form.reset({
        ref: commande.ref,
        priority: commande.priority as Priority,
        status: commande.status as Status,
        originalItems: commande.originalItems
          ? JSON.stringify(commande.originalItems, null, 2)
          : '',
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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select disabled={!canEdit} onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner la priorité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={Priority.URGENT}>Urgent</SelectItem>
                        <SelectItem value={Priority.NORMAL}>Normal</SelectItem>
                        <SelectItem value={Priority.ILES}>Îles</SelectItem>
                      </SelectContent>
                    </Select>
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
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="originalItems"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Éléments originaux (JSON)</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      disabled={!canEdit}
                      rows={6}
                      placeholder="Saisir les données JSON..."
                      className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 font-mono text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </FormControl>
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
