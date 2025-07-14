import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Commande } from '@/components/admin/chargement/dnd/draggable';
import React from 'react';

export default function CommandeModal({
  children,
  commande,
}: {
  children: React.ReactNode;
  commande: Commande;
}) {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Commande: {commande.ref}</DialogTitle>
          <DialogDescription>
            {commande.client} - {commande.items} items
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
