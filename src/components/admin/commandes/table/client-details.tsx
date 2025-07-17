import React from 'react';
import { Building, Mail, Phone, MapPin } from 'lucide-react';
import { TrpcClientFromCommande } from '@/types/trpc-types';

export function ClientDetails({ client }: { client: TrpcClientFromCommande }) {
  if (!client) return null;

  return (
    <div className="space-y-2">
      <h4 className="flex items-center gap-2 font-medium">
        <Building className="h-4 w-4" />
        Informations client
      </h4>
      <div className="bg-background grid grid-cols-1 gap-4 rounded-md border p-4 md:grid-cols-2">
        <div className="space-y-2">
          <p>
            <span className="font-medium">Nom:</span> {client.name}
          </p>
          <p>
            <span className="font-medium">Code:</span> {client.code}
          </p>
          {client.contactPerson && (
            <p>
              <span className="font-medium">Contact:</span> {client.contactPerson}
            </p>
          )}
        </div>
        <div className="space-y-2">
          {client.email && (
            <div className="flex items-center gap-2">
              <Mail className="text-muted-foreground h-4 w-4" />
              <span>{client.email}</span>
            </div>
          )}
          {client.phone && (
            <div className="flex items-center gap-2">
              <Phone className="text-muted-foreground h-4 w-4" />
              <span>{client.phone}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <MapPin className="text-muted-foreground h-4 w-4" />
            <span>
              {client.city}, {client.postalCode}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
