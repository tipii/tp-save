import React, { useEffect } from 'react';
import { useCommande } from './commande-context';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Priority, Status } from '@/generated/prisma';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar, Save } from 'lucide-react';
import { toast } from 'sonner';
import { Combobox } from '@/components/ui/combobox';
import { priorityToText, statusToText, priorityToBadge } from '@/components/ui/enum-to-ui';

const schema = z.object({
  priority: z.enum(Priority),
  status: z.enum(Status),
  plannedDeliveryDate: z.string().optional(),
  orderReceptionMode: z.string().optional(),
  orderReceptionDate: z.string().optional(),
  orderReceivedById: z.string().optional(),
  orderTransmittedById: z.string().optional(),
  cf_bl_ou_rq_number: z.string().optional(),
  quote_number: z.string().optional(),
  bonPrepaGesco: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CommandeDetails({ refetch }: { refetch: () => void }) {
  const { selectedCommande } = useCommande();
  const trpc = useTRPC();
  const { data: users } = useQuery(trpc.users.getUsers.queryOptions());
  const updateMutation = useMutation(trpc.commandes.updateCommande.mutationOptions());

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      priority: Priority.UNDEFINED,
      status: Status.PENDING,
      plannedDeliveryDate: '',
      orderReceptionMode: '',
      orderReceptionDate: '',
      orderReceivedById: '',
      orderTransmittedById: '',
      cf_bl_ou_rq_number: '',
      quote_number: '',
      bonPrepaGesco: '',
    },
  });

  useEffect(() => {
    if (!selectedCommande) return;
    // console.log(selectedCommande);

    form.reset({
      priority: selectedCommande.priority,
      status: selectedCommande.status,
      plannedDeliveryDate: selectedCommande.plannedDeliveryDate
        ? new Date(selectedCommande.plannedDeliveryDate).toISOString().split('T')[0]
        : '',
      orderReceptionMode: selectedCommande.orderReceptionMode ?? '',
      orderReceptionDate: selectedCommande.orderReceptionDate
        ? new Date(selectedCommande.orderReceptionDate).toISOString().split('T')[0]
        : '',
      orderReceivedById: selectedCommande.orderReceivedById ?? '',
      orderTransmittedById: selectedCommande.orderTransmittedById ?? '',
      cf_bl_ou_rq_number: selectedCommande.cf_bl_ou_rq_number ?? '',
      quote_number: selectedCommande.quote_number ?? '',
      bonPrepaGesco: selectedCommande.bonPrepaGesco ?? '',
    });
  }, [selectedCommande, form]);

  if (!selectedCommande) {
    return (
      <div className="text-muted-foreground flex h-full items-center justify-center">
        Sélectionnez une commande pour voir les détails
      </div>
    );
  }

  const onSubmit = async (values: FormValues) => {
    await updateMutation.mutateAsync(
      {
        id: selectedCommande.id,
        priority: values.priority,
        status: values.status,
        plannedDeliveryDate: values.plannedDeliveryDate
          ? new Date(values.plannedDeliveryDate)
          : undefined,
        orderReceptionMode: values.orderReceptionMode || undefined,
        orderReceptionDate: values.orderReceptionDate
          ? new Date(values.orderReceptionDate)
          : undefined,
        orderReceivedById: values.orderReceivedById || undefined,
        orderTransmittedById: values.orderTransmittedById || undefined,
        cf_bl_ou_rq_number: values.cf_bl_ou_rq_number || undefined,
        quote_number: values.quote_number || undefined,
        bonPrepaGesco: values.bonPrepaGesco || undefined,
      },
      {
        onSuccess: () => {
          toast.success('Commande mise à jour');
          refetch();
        },
        onError: () => {
          toast.error('Erreur lors de la sauvegarde');
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Livraison section */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priorité</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner la priorité" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={Priority.URGENT}>
                        {priorityToText(Priority.URGENT)}
                      </SelectItem>
                      <SelectItem value={Priority.NORMAL}>
                        {priorityToText(Priority.NORMAL)}
                      </SelectItem>
                      <SelectItem value={Priority.ILES}>{priorityToText(Priority.ILES)}</SelectItem>
                      <SelectItem value={Priority.UNDEFINED}>
                        {priorityToText(Priority.UNDEFINED)}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plannedDeliveryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date de livraison prévue</FormLabel>
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
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                      <SelectItem value={Status.PENDING}>{statusToText(Status.PENDING)}</SelectItem>
                      <SelectItem value={Status.READY}>{statusToText(Status.READY)}</SelectItem>
                      <SelectItem value={Status.DELIVERING}>
                        {statusToText(Status.DELIVERING)}
                      </SelectItem>
                      <SelectItem value={Status.DELIVERED}>
                        {statusToText(Status.DELIVERED)}
                      </SelectItem>
                      <SelectItem value={Status.CANCELLED}>
                        {statusToText(Status.CANCELLED)}
                      </SelectItem>
                      <SelectItem value={Status.MIXED}>{statusToText(Status.MIXED)}</SelectItem>
                      <SelectItem value={Status.TO_RETURN}>
                        {statusToText(Status.TO_RETURN)}
                      </SelectItem>
                      <SelectItem value={Status.RETURNED}>
                        {statusToText(Status.RETURNED)}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Order processing section */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-700">Traitement de commande</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FormField
              control={form.control}
              name="orderReceptionMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mode de réception</FormLabel>
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
                    <Calendar className="h-4 w-4" /> Date de réception
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

            <FormField
              control={form.control}
              name="orderReceivedById"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Réceptionné par</FormLabel>
                  <Combobox
                    options={users?.map((u) => ({ value: u.id, label: u.name })) || []}
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
                  <FormLabel>Transmis par</FormLabel>
                  <Combobox
                    options={users?.map((u) => ({ value: u.id, label: u.name })) || []}
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Docs section */}
        <div className="space-y-4">
          <div className="text-sm font-semibold text-slate-700">Documents</div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <FormField
              control={form.control}
              name="cf_bl_ou_rq_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CF BL/RQ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Numéro CF BL ou RQ" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quote_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Devis</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Numéro de devis" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bonPrepaGesco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bon Prépa Gesco</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bon Préparation Gesco" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Save button bottom-right */}
        <div className="flex justify-end">
          <Button type="submit" disabled={updateMutation.isPending}>
            <Save className="mr-2 h-4 w-4" /> Enregistrer
          </Button>
        </div>
      </form>
    </Form>
  );
}
