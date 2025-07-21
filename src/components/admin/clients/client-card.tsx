import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, User, Building, FileText, Pencil } from 'lucide-react';
import React from 'react';
import { TrpcClient } from '@/types/trpc-types';

export default function ClientCard({ client }: { client: TrpcClient }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex gap-2 text-lg">
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Informations Client
          </div>
          <a
            href={`/app/clients/${client.id}`}
            className="ml-auto flex items-center gap-2 text-sm text-blue-600 hover:underline"
            title="Edit client"
          >
            <Pencil className="h-4 w-4" />
            Modifier
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Client Basic Info */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{client.name}</h3>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>Code: {client.code}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Contact Information */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Contact
            </h4>

            <div className="flex items-center gap-2">
              <User className="text-muted-foreground h-4 w-4" />
              <span className="text-sm">{client.contactPerson ?? 'Non renseigné'}</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail className="text-muted-foreground h-4 w-4" />

              {client.email ? (
                <a
                  href={`mailto:${client.email}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {client.email}
                </a>
              ) : (
                <span className="text-muted-foreground text-sm">Non renseigné</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              {client.phone ? (
                <a href={`tel:${client.phone}`} className="text-sm text-blue-600 hover:underline">
                  {client.phone}
                </a>
              ) : (
                <span className="text-muted-foreground text-sm">Non renseigné</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              {client.phoneSecond ? (
                <a
                  href={`tel:${client.phoneSecond}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  {client.phoneSecond} (2e)
                </a>
              ) : (
                <span className="text-muted-foreground text-sm">Non renseigné</span>
              )}
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
              Adresse
            </h4>
            <div className="flex items-start gap-2">
              <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 flex-shrink-0" />
              {client.address ? (
                <div className="text-sm">
                  <div>{client.address}</div>
                  <div>
                    {client.postalCode} {client.city}
                  </div>
                  <div className="text-muted-foreground">{client.country}</div>
                </div>
              ) : (
                <div className="text-muted-foreground text-sm">Non renseigné</div>
              )}
            </div>
          </div>
        </div>

        {/* Notes */}
        {client.notes && (
          <>
            <Separator />
            <div className="space-y-2">
              <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium tracking-wide uppercase">
                <FileText className="h-4 w-4" />
                Notes
              </h4>
              <div className="bg-muted rounded-md p-3 text-sm">{client.notes}</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
