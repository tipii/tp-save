'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Key } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTRPC } from '@/trpc/client';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface User {
  id: string;
  name: string;
  email: string;
  role: string | null;
  phoneNumber: string | null;
  banned: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (userId: string) => void;
  onPasswordChange: (userId: string, userName: string) => void;
  onRefetch: () => void;
}

export function UsersTable({ users, isLoading, onEdit, onPasswordChange, onRefetch }: UsersTableProps) {
  const trpc = useTRPC();

  const { mutate: deleteUser, isPending: isDeleting } = useMutation(
    trpc.users.deleteUser.mutationOptions({
      onSuccess: () => {
        toast.success('Utilisateur supprimé avec succès');
        onRefetch();
      },
      onError: (error) => {
        toast.error(error.message || 'Erreur lors de la suppression');
      },
    }),
  );

  const getRoleBadge = (role: string | null) => {
    if (!role) return <Badge variant="outline">Aucun rôle</Badge>;

    const roleColors: Record<string, string> = {
      admin: 'bg-red-100 text-red-800',
      secretaire: 'bg-blue-100 text-blue-800',
      livreur: 'bg-green-100 text-green-800',
      technicien: 'bg-purple-100 text-purple-800',
    };

    return (
      <Badge className={roleColors[role] || 'bg-gray-100 text-gray-800'} variant="outline">
        {role}
      </Badge>
    );
  };

  const getStatusBadge = (banned: boolean | null) => {
    const isActive = !banned;
    return (
      <Badge
        className={isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
        variant="outline"
      >
        {isActive ? 'Actif' : 'Inactif'}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Aucun utilisateur trouvé</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
          <TableHead>Nom</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Rôle</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead>Téléphone</TableHead>
          <TableHead>Date de création</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{getRoleBadge(user.role)}</TableCell>
            <TableCell>{getStatusBadge(user.banned)}</TableCell>
            <TableCell>{user.phoneNumber || '-'}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString('fr-FR')}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(user.id)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onPasswordChange(user.id, user.name)}
                >
                  <Key className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" disabled={isDeleting}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                      <AlertDialogDescription>
                        Êtes-vous sûr de vouloir supprimer l'utilisateur "{user.name}" ? Cette
                        action est irréversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          deleteUser({ id: user.id });
                        }}
                      >
                        Supprimer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
