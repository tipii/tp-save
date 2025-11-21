'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Role } from '@/lib/constants';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  onSuccess: () => void;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: string;
  phoneNumber: string;
  banned: boolean;
}

const ROLES = [
  { value: Role.ADMIN, label: 'Administrateur' },
  { value: Role.SECRETAIRE, label: 'Secrétaire' },
  { value: Role.LIVREUR, label: 'Livreur' },
];

export function UserDialog({ open, onClose, userId, onSuccess }: UserDialogProps) {
  const trpc = useTRPC();
  const isEditing = !!userId;

  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    email: '',
    password: '',
    role: '',
    phoneNumber: '',

    banned: false,
  });

  // Fetch user data if editing
  const { data: userData } = useQuery({
    ...trpc.users.getUserById.queryOptions({ id: userId! }),
    enabled: isEditing,
  });

  // Load user data into form when editing
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        email: userData.email,
        password: '',
        role: userData.role || '',
        phoneNumber: userData.phoneNumber || '',

        banned: userData.banned || false,
      });
    } else if (!isEditing) {
      // Reset form when creating new user
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '',
        phoneNumber: '',

        banned: false,
      });
    }
  }, [userData, isEditing]);

  const { mutate: createUser, isPending: isCreating } = useMutation(
    trpc.users.createUser.mutationOptions({
      onSuccess: () => {
        toast.success('Utilisateur créé avec succès');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message || 'Erreur lors de la création');
      },
    }),
  );

  const { mutate: updateUser, isPending: isUpdating } = useMutation(
    trpc.users.updateUser.mutationOptions({
      onSuccess: () => {
        toast.success('Utilisateur mis à jour avec succès');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.message || 'Erreur lors de la mise à jour');
      },
    }),
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing) {
      updateUser({
        id: userId!,
        name: formData.name,
        email: formData.email,
        role: formData.role as Role,
        phoneNumber: formData.phoneNumber || undefined,

        banned: formData.banned,
      });
    } else {
      if (!formData.password) {
        toast.error('Le mot de passe est requis');
        return;
      }
      createUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role as Role,
        phoneNumber: formData.phoneNumber || undefined,
        banned: formData.banned,
      });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Modifier l'utilisateur" : 'Nouvel utilisateur'}</DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Modifiez les informations de l'utilisateur"
              : 'Créez un nouveau compte utilisateur'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Nom complet <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Jean Dupont"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="jean.dupont@example.com"
                required
              />
            </div>
          </div>

          {!isEditing && (
            <div className="space-y-2">
              <Label htmlFor="password">
                Mot de passe <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required={!isEditing}
                minLength={6}
              />
              <p className="text-muted-foreground text-xs">Minimum 6 caractères</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent>
                  {ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Téléphone</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active-status"
              checked={!formData.banned}
              onCheckedChange={(checked) => setFormData({ ...formData, banned: !checked })}
            />
            <Label htmlFor="active-status" className="cursor-pointer">
              Utilisateur actif
            </Label>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'En cours...' : isEditing ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
