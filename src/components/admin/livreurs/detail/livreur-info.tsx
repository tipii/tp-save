'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, Phone, MapPin, Calendar, Package, Truck, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Status } from '@/generated/prisma';
import { TrpcLivreur } from '@/types/trpc-types';
import { getUserInitials } from '@/lib/utils';

interface LivreurInfoProps {
  livreur: TrpcLivreur;
}

export function LivreurInfo({ livreur }: LivreurInfoProps) {
  // Calculate statistics
  const totalChargements = livreur.chargements?.length || 0;
  const completedChargements =
    livreur.chargements?.filter((c) => c.status === Status.DELIVERED).length || 0;
  const totalLivraisons =
    livreur.chargements?.reduce((sum, c) => sum + c.livraisons.length, 0) || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations Livreur</CardTitle>
        <CardDescription>Détails et statistiques</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center space-y-2">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
              {getUserInitials(livreur.name)}
            </AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{livreur.name}</h3>
            <Badge variant="outline" className="mt-1">
              {livreur.role}
            </Badge>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-semibold">Contact</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="text-muted-foreground h-4 w-4" />
              <span className="break-all">{livreur.email}</span>
            </div>
            {livreur.phoneNumber && (
              <div className="flex items-center gap-3 text-sm">
                <Phone className="text-muted-foreground h-4 w-4" />
                <span>{livreur.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-semibold">Compte</h4>
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <span>
              Créé le {format(new Date(livreur.createdAt), 'dd MMMM yyyy', { locale: fr })}
            </span>
          </div>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <h4 className="text-muted-foreground text-sm font-semibold">Statistiques</h4>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Chargements</span>
              </div>
              <Badge variant="secondary" className="text-base">
                {totalChargements}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium">Complétés</span>
              </div>
              <Badge variant="secondary" className="text-base">
                {completedChargements}
              </Badge>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium">Livraisons</span>
              </div>
              <Badge variant="secondary" className="text-base">
                {totalLivraisons}
              </Badge>
            </div>
          </div>
        </div>

        {/* Success Rate */}
        {totalChargements > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Taux de réussite</span>
              <span className="font-semibold">
                {Math.round((completedChargements / totalChargements) * 100)}%
              </span>
            </div>
            <div className="bg-secondary h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-full bg-green-600 transition-all"
                style={{
                  width: `${(completedChargements / totalChargements) * 100}%`,
                }}
              />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
