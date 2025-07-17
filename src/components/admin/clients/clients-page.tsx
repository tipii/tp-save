'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChevronDown,
  ChevronRight,
  Building,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Package,
  Clock,
  AlertCircle,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function ClientPageComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    setBreadcrumb([{ label: 'Tallin Pi Livraison', href: '/app' }], 'Clients');
  }, [setBreadcrumb]);

  const trpc = useTRPC();
  const { data: clients, isPending } = useQuery(trpc.clients.getClients.queryOptions());

  const toggleRow = (clientId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(clientId)) {
        newSet.delete(clientId);
      } else {
        newSet.add(clientId);
      }
      return newSet;
    });
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return (
          <Badge variant="destructive" className="text-xs">
            Urgent
          </Badge>
        );
      case 'Normal':
        return (
          <Badge variant="secondary" className="text-xs">
            Normal
          </Badge>
        );
      case 'Îles':
        return (
          <Badge variant="default" className="text-xs">
            Îles
          </Badge>
        );
      default:
        return (
          <Badge variant="default" className="text-xs">
            Non défini
          </Badge>
        );
    }
  };

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-muted-foreground mt-2 text-sm">Chargement des clients...</p>
        </div>
      </div>
    );
  }

  if (!clients || clients.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <Building className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <p className="text-lg font-semibold">Aucun client trouvé</p>
          <p className="text-muted-foreground text-sm">
            Ajoutez votre premier client pour commencer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Clients ({clients.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Commandes</TableHead>
                  <TableHead>Dernière activité</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <React.Fragment key={client.id}>
                    <TableRow
                      className={cn(
                        'hover:bg-muted/50 cursor-pointer',
                        expandedRows.has(client.id) && 'bg-muted/30',
                      )}
                      onClick={() => toggleRow(client.id)}
                    >
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          {expandedRows.has(client.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                            <Building className="text-primary h-5 w-5" />
                          </div>
                          <div>
                            <div className="font-medium">{client.name}</div>
                            <div className="text-muted-foreground text-sm">{client.code}</div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          {client.email && (
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="text-muted-foreground h-3 w-3" />
                              <span className="truncate">{client.email}</span>
                            </div>
                          )}
                          {client.phone && (
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="text-muted-foreground h-3 w-3" />
                              <span>{client.phone}</span>
                            </div>
                          )}
                          {client.contactPerson && (
                            <div className="flex items-center gap-2 text-sm">
                              <User className="text-muted-foreground h-3 w-3" />
                              <span className="truncate">{client.contactPerson}</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="text-muted-foreground h-3 w-3" />
                          <span className="truncate">
                            {client.city}, {client.postalCode}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="text-muted-foreground h-4 w-4" />
                          <span className="font-medium">{client.commandes.length}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-muted-foreground flex items-center gap-2 text-sm">
                          <Clock className="h-3 w-3" />
                          <span>{new Date(client.updatedAt).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedRows.has(client.id) && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-muted/20 p-0">
                          <div className="space-y-4 p-6">
                            {/* Client Details */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                              <div className="space-y-2">
                                <h4 className="flex items-center gap-2 font-medium">
                                  <User className="h-4 w-4" />
                                  Informations contact
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <p>
                                    <span className="font-medium">Email:</span>{' '}
                                    {client.email || 'Non renseigné'}
                                  </p>
                                  <p>
                                    <span className="font-medium">Téléphone:</span>{' '}
                                    {client.phone || 'Non renseigné'}
                                  </p>
                                  {client.phoneSecond && (
                                    <p>
                                      <span className="font-medium">Téléphone 2:</span>{' '}
                                      {client.phoneSecond}
                                    </p>
                                  )}
                                  <p>
                                    <span className="font-medium">Contact:</span>{' '}
                                    {client.contactPerson || 'Non renseigné'}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="flex items-center gap-2 font-medium">
                                  <MapPin className="h-4 w-4" />
                                  Adresse
                                </h4>
                                <div className="text-sm">
                                  <p>{client.address}</p>
                                  <p>
                                    {client.city}, {client.postalCode}
                                  </p>
                                  <p>{client.country}</p>
                                </div>
                              </div>
                            </div>

                            {/* Notes */}
                            {client.notes && (
                              <div className="space-y-2">
                                <h4 className="flex items-center gap-2 font-medium">
                                  <FileText className="h-4 w-4" />
                                  Notes
                                </h4>
                                <p className="text-muted-foreground bg-muted/50 rounded-md p-3 text-sm">
                                  {client.notes}
                                </p>
                              </div>
                            )}

                            {/* Commandes */}
                            <div className="space-y-2">
                              <h4 className="flex items-center gap-2 font-medium">
                                <Package className="h-4 w-4" />
                                Commandes ({client.commandes.length})
                              </h4>
                              {client.commandes.length > 0 ? (
                                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                  {client.commandes.map((commande) => (
                                    <div
                                      key={commande.id}
                                      className="bg-background flex items-center justify-between rounded-md border p-3"
                                    >
                                      <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                          <span className="font-medium">{commande.ref}</span>
                                          {getPriorityBadge(commande.priority)}
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <Link href={`/app/commandes/${commande.id}`}>
                                                <Eye className="h-4 w-4" />
                                              </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>Voir la commande</TooltipContent>
                                          </Tooltip>
                                        </div>
                                        <div className="text-muted-foreground text-sm">
                                          {commande.lots.length} lots
                                        </div>
                                      </div>
                                      <div className="text-muted-foreground text-sm">
                                        {new Date(commande.createdAt).toLocaleDateString('fr-FR')}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-muted-foreground flex items-center justify-center py-8">
                                  <div className="text-center">
                                    <Package className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                    <p>Aucune commande pour ce client</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
