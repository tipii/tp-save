'use client';
import React, { useState } from 'react';
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
  User,
  Mail,
  Phone,
  MapPin,
  Package,
  Clock,
  Truck,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TrpcLivreur } from '@/types/trpc-types';
import { priorityToBadge } from '@/lib/enum-to-ui';

interface LivreursTableProps {
  livreurs: TrpcLivreur[];
}

export function LivreursTable({ livreurs }: LivreursTableProps) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (livreurId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(livreurId)) {
        newSet.delete(livreurId);
      } else {
        newSet.add(livreurId);
      }
      return newSet;
    });
  };

  const getStatusBadge = (livreur: TrpcLivreur) => {
    if (livreur.banned) {
      return (
        <Badge variant="destructive" className="flex items-center gap-1">
          <XCircle className="h-3 w-3" />
          Suspendu
        </Badge>
      );
    }
    return (
      <Badge variant="default" className="flex items-center gap-1">
        <CheckCircle className="h-3 w-3" />
        Actif
      </Badge>
    );
  };

  const getChargementStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'in_progress':
        return <Badge variant="default">En cours</Badge>;
      case 'completed':
        return (
          <Badge variant="default" className="bg-green-600 hover:bg-green-700">
            Terminé
          </Badge>
        );
      case 'cancelled':
        return <Badge variant="destructive">Annulé</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return (
          <Badge variant="destructive" className="text-xs">
            🔴 Urgent
          </Badge>
        );
      case 'Normal':
        return (
          <Badge variant="secondary" className="text-xs">
            ⚪ Normal
          </Badge>
        );
      case 'Îles':
        return (
          <Badge variant="default" className="text-xs">
            🏝️ Îles
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="text-xs">
            {priority}
          </Badge>
        );
    }
  };

  const getActiveChargements = (livreur: TrpcLivreur) => {
    return livreur.chargements.filter((c) => c.status !== 'completed' && c.status !== 'cancelled');
  };

  const getTotalLots = (livreur: TrpcLivreur) => {
    return livreur.chargements.reduce(
      (total, chargement) => total + chargement.livraisons.length,
      0,
    );
  };

  if (!livreurs || livreurs.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <Truck className="text-muted-foreground mx-auto mb-4 h-12 w-12" />
          <p className="text-lg font-semibold">Aucun livreur trouvé</p>
          <p className="text-muted-foreground text-sm">
            Ajoutez votre premier livreur pour commencer.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Livreurs ({livreurs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Livreur</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Chargements</TableHead>
                <TableHead>Lots totaux</TableHead>
                <TableHead>Dernière activité</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {livreurs.map((livreur) => (
                <React.Fragment key={livreur.id}>
                  <TableRow
                    className={cn(
                      'hover:bg-muted/50 cursor-pointer',
                      expandedRows.has(livreur.id) && 'bg-muted/30',
                    )}
                    onClick={() => toggleRow(livreur.id)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedRows.has(livreur.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full">
                          <User className="text-primary h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium">{livreur.name}</div>
                          <div className="text-muted-foreground text-sm">
                            {livreur.username || "Pas de nom d'utilisateur"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {livreur.email && (
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="text-muted-foreground h-3 w-3" />
                            <span className="truncate">{livreur.email}</span>
                          </div>
                        )}
                        {livreur.phoneNumber && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="text-muted-foreground h-3 w-3" />
                            <span>{livreur.phoneNumber}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(livreur)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="text-muted-foreground h-4 w-4" />
                        <span className="font-medium">{getActiveChargements(livreur).length}</span>
                        <span className="text-muted-foreground text-sm">actifs</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="text-muted-foreground h-4 w-4" />
                        <span className="font-medium">{getTotalLots(livreur)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-muted-foreground flex items-center gap-2 text-sm">
                        <Clock className="h-3 w-3" />
                        <span>{new Date(livreur.updatedAt).toLocaleDateString('fr-FR')}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(livreur.id) && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-muted/20 p-0">
                        <div className="space-y-4 p-6">
                          {/* Livreur Details */}
                          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <h4 className="flex items-center gap-2 font-medium">
                                <User className="h-4 w-4" />
                                Informations personnelles
                              </h4>
                              <div className="space-y-1 text-sm">
                                <p>
                                  <span className="font-medium">Email:</span>{' '}
                                  {livreur.email || 'Non renseigné'}
                                </p>
                                <p>
                                  <span className="font-medium">Téléphone:</span>{' '}
                                  {livreur.phoneNumber || 'Non renseigné'}
                                </p>
                                <p>
                                  <span className="font-medium">Vérifié:</span>{' '}
                                  {livreur.phoneNumberVerified ? '✅ Oui' : '❌ Non'}
                                </p>
                                <p>
                                  <span className="font-medium">Rôle:</span>{' '}
                                  {livreur.role || 'Non défini'}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="flex items-center gap-2 font-medium">
                                <AlertTriangle className="h-4 w-4" />
                                Statut du compte
                              </h4>
                              <div className="text-sm">
                                {livreur.banned ? (
                                  <div className="space-y-1">
                                    <p className="font-medium text-red-600">⚠️ Compte suspendu</p>
                                    {livreur.banReason && (
                                      <p>
                                        <span className="font-medium">Raison:</span>{' '}
                                        {livreur.banReason}
                                      </p>
                                    )}
                                    {livreur.banExpires && (
                                      <p>
                                        <span className="font-medium">Expire le:</span>{' '}
                                        {new Date(livreur.banExpires).toLocaleDateString('fr-FR')}
                                      </p>
                                    )}
                                  </div>
                                ) : (
                                  <p className="font-medium text-green-600">✅ Compte actif</p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Chargements */}
                          <div className="space-y-2">
                            <h4 className="flex items-center gap-2 font-medium">
                              <Truck className="h-4 w-4" />
                              Chargements ({livreur.chargements.length})
                            </h4>
                            {livreur.chargements.length > 0 ? (
                              <div className="space-y-3">
                                {livreur.chargements.map((chargement) => (
                                  <div
                                    key={chargement.id}
                                    className="bg-background rounded-md border p-4"
                                  >
                                    <div className="mb-3 flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <span className="font-medium">{chargement.name}</span>
                                        {getChargementStatusBadge(chargement.status)}
                                      </div>
                                      <div className="text-muted-foreground text-sm">
                                        {new Date(chargement.createdAt).toLocaleDateString('fr-FR')}
                                      </div>
                                    </div>

                                    {/* Lots in chargement */}
                                    {chargement.livraisons.length > 0 && (
                                      <div className="space-y-2">
                                        <h6 className="text-muted-foreground text-sm font-medium">
                                          Lots ({chargement.livraisons.length}):
                                        </h6>
                                        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
                                          {chargement.livraisons.map((livraison) => (
                                            <div
                                              key={livraison.id}
                                              className="bg-muted/50 flex items-center justify-between rounded p-2"
                                            >
                                              <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                  <span className="text-sm font-medium">
                                                    {livraison.name ||
                                                      `Livraison ${livraison.id.slice(-4)}`}
                                                  </span>
                                                  {livraison.priority &&
                                                    priorityToBadge(livraison.priority)}
                                                </div>
                                                {livraison.commande && (
                                                  <div className="text-muted-foreground text-xs">
                                                    Commande: {livraison.commande.ref}
                                                  </div>
                                                )}
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-muted-foreground flex items-center justify-center py-8">
                                <div className="text-center">
                                  <Truck className="mx-auto mb-2 h-8 w-8 opacity-50" />
                                  <p>Aucun chargement assigné</p>
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
  );
}
