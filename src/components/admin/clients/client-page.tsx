'use client';

import { useTRPC } from '@/trpc/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Phone,
  MapPin,
  FileText,
  Building,
  Calendar,
} from 'lucide-react';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';

// Form validation schema
const clientFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  phoneSecond: z.string().optional(),
  contactPerson: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
});

type ClientFormData = z.infer<typeof clientFormSchema>;

export default function ClientPageComponent({ id }: { id: string }) {
  const trpc = useTRPC();
  const [isEditing, setIsEditing] = useState(false);
  const {
    data: client,
    isPending,
    refetch,
  } = useQuery(trpc.clients.getClientById.queryOptions(id));

  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([{ label: 'Clients', href: '/app/clients' }], client?.name ?? 'Client');
  }, [setBreadcrumb, client]);

  const updateClientMutation = useMutation(trpc.clients.updateClient.mutationOptions());

  const form = useForm<ClientFormData>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      phoneSecond: '',
      contactPerson: '',
      address: '',
      city: '',
      postalCode: '',
      country: '',
      notes: '',
    },
  });

  // Update form values when client data loads
  React.useEffect(() => {
    if (client) {
      form.reset({
        name: client.name || '',
        email: client.email || '',
        phone: client.phone || '',
        phoneSecond: client.phoneSecond || '',
        contactPerson: client.contactPerson || '',
        address: client.address || '',
        city: client.city || '',
        postalCode: client.postalCode || '',
        country: client.country || '',
        notes: client.notes || '',
      });
    }
  }, [client, form]);

  const onSubmit = (data: ClientFormData) => {
    if (!client) return;

    updateClientMutation.mutate(
      {
        id: client.id,
        ...data,
      },
      {
        onSuccess: () => {
          toast.success('Client mis à jour avec succès');
          refetch();
          setIsEditing(false);
        },
        onError: (error) => {
          toast.error('Erreur lors de la mise à jour du client');
          console.error('Update client error:', error);
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground">Chargement...</div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-destructive">Client non trouvé</div>
      </div>
    );
  }

  return (
    <Card className="m-4 gap-0 rounded-sm">
      {/* Header */}
      <CardHeader className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{client.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="outline">{client.code}</Badge>
            <span className="text-muted-foreground text-sm">
              Créé le{' '}
              {new Date(client.createdAt).toLocaleString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </span>
          </div>
        </div>
        <Button
          variant={isEditing ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Annuler
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </>
          )}
        </Button>
      </CardHeader>

      {/* Client Form */}

      <CardContent className="p-4">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2">
            <Building className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold">Informations du client</h3>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Nom de l'entreprise
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom de l'entreprise" disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="contactPerson"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Contact principal
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nom du contact principal"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="email@exemple.com"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Téléphone principal
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="+689 40 12 34 56" disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phoneSecond"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Téléphone secondaire
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="+689 40 12 34 57" disabled={!isEditing} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Address Information */}
            <div className="space-y-4">
              <div className="mb-4 flex items-center gap-2">
                <div className="rounded-lg bg-blue-100 p-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold">Adresse</h3>
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Rue, numéro, complément"
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Papeete" disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code postal</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="98713" disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pays</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Polynésie française" disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Notes internes sur le client..."
                      className="min-h-[100px]"
                      disabled={!isEditing}
                    />
                  </FormControl>
                  <FormDescription>Informations complémentaires sur le client</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timestamps */}
            <div className="space-y-2 border-t pt-4">
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  Créé le :{' '}
                  {new Date(client.createdAt).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                <span>
                  Mise à jour le :{' '}
                  {new Date(client.updatedAt).toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  })}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            {isEditing && (
              <div className="flex justify-end gap-4 border-t pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  <X className="mr-2 h-4 w-4" />
                  Annuler
                </Button>
                <Button type="submit" disabled={updateClientMutation.isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  {updateClientMutation.isPending ? 'Sauvegarde...' : 'Sauvegarder'}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
