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
import { Edit, Save, X, User, Calendar, Truck, Package, NotebookText } from 'lucide-react';
import { toast } from 'sonner';
import { useCommandeEdit } from '../hooks/use-commande-edit';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/trpc/client';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Combobox } from '../../../ui/combobox';

const commandeUpdateSchema = z.object({
  name: z.string().min(1, 'Le nom est requise'),
  status: z.enum(Status),
  orderReceivedById: z.string().optional(),
  orderTransmittedById: z.string().optional(),
  orderReceptionMode: z.string().optional(),
  orderReceptionDate: z.string().optional(),
});

type CommandeUpdateForm = z.infer<typeof commandeUpdateSchema>;

interface CommandeEditFormProps {
  commandeId: string;
}

export function CommandeEditForm({ commandeId }: CommandeEditFormProps) {
  const { commande, updateCommande, mutations } = useCommandeEdit(commandeId);

  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.users.getUsers.queryOptions());

  const form = useForm<CommandeUpdateForm>({
    resolver: zodResolver(commandeUpdateSchema),
    defaultValues: {
      name: '',
      status: Status.PENDING,
      orderReceivedById: '',
      orderTransmittedById: '',
      orderReceptionMode: '',
      orderReceptionDate: '',
    },
  });

  // Update form when commande data changes
  useEffect(() => {
    if (commande) {
      form.reset({
        name: commande.name || 'Commande',
        status: commande.status as Status,
        orderReceivedById: commande.orderReceivedById || '',
        orderTransmittedById: commande.orderTransmittedById || '',
        orderReceptionMode: commande.orderReceptionMode || '',
        orderReceptionDate: commande.orderReceptionDate
          ? new Date(commande.orderReceptionDate).toISOString().split('T')[0]
          : '',
      });
    }
  }, [commande, form]);

  const handleSave = async (data: CommandeUpdateForm) => {
    await updateCommande({
      name: data.name,
      status: data.status,
      orderReceivedById: data.orderReceivedById || undefined,
      orderTransmittedById: data.orderTransmittedById || undefined,
      orderReceptionMode: data.orderReceptionMode || undefined,
      orderReceptionDate: data.orderReceptionDate ? new Date(data.orderReceptionDate) : undefined,
    });
  };

  const handleCancel = () => {
    if (commande) {
      form.reset({
        name: commande.name || 'Commande',
        status: commande.status as Status,
        orderReceivedById: commande.orderReceivedById || '',
        orderTransmittedById: commande.orderTransmittedById || '',
        orderReceptionMode: commande.orderReceptionMode || '',
        orderReceptionDate: commande.orderReceptionDate
          ? new Date(commande.orderReceptionDate).toISOString().split('T')[0]
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
          <div className="rounded-lg bg-blue-100 p-2">
            <Edit className="h-5 w-5 text-blue-600" />
          </div>
          Détails de la Commande
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Saisir la référence" />
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
                  <Select onValueChange={field.onChange} value={field.value}>
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

            {/* User Assignment Fields */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <FormField
                control={form.control}
                name="orderReceivedById"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Réceptionné par
                    </FormLabel>
                    <Combobox
                      options={users?.map((user) => ({ value: user.id, label: user.name })) || []}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderTransmittedById"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <NotebookText className="h-4 w-4" />
                      Transmis par
                    </FormLabel>
                    <Combobox
                      options={users?.map((user) => ({ value: user.id, label: user.name })) || []}
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderReceptionMode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Package className="h-4 w-4" />
                      Mode de réception
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Mode de réception" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="orderReceptionDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Date de réception
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            {field.value ? (
                              new Date(field.value).toLocaleDateString('fr-FR')
                            ) : (
                              <span className="text-muted-foreground">Sélectionner une date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) =>
                            field.onChange(date ? date.toISOString().split('T')[0] : '')
                          }
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-1 justify-end gap-2 pt-4">
              <Button type="submit" disabled={mutations.update.isPending}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer les modifications
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                <X className="mr-2 h-4 w-4" />
                Annuler
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
