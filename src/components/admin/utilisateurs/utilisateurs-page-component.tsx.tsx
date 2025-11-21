'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { UsersTable } from '@/components/admin/utilisateurs/components/users-table';
import { UserDialog } from '@/components/admin/utilisateurs/components/user-dialog';
import { PasswordDialog } from '@/components/admin/utilisateurs/components/password-dialog';
import { useBreadcrumb } from '../shared/breadcrumb/breadcrumb-context';

export default function UtilisateursPageComponent() {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb([], 'Utilisateurs');
  }, [setBreadcrumb]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordUserId, setPasswordUserId] = useState<string | null>(null);
  const [passwordUserName, setPasswordUserName] = useState<string | null>(null);

  const trpc = useTRPC();
  const { data: users, isLoading, refetch } = useQuery(trpc.users.getUsers.queryOptions());

  const handleCreate = () => {
    setSelectedUserId(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (userId: string) => {
    setSelectedUserId(userId);
    setIsDialogOpen(true);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setSelectedUserId(null);
  };

  const handleSuccess = () => {
    refetch();
    handleClose();
  };

  const handlePasswordChange = (userId: string, userName: string) => {
    setPasswordUserId(userId);
    setPasswordUserName(userName);
    setIsPasswordDialogOpen(true);
  };

  const handlePasswordDialogClose = () => {
    setIsPasswordDialogOpen(false);
    setPasswordUserId(null);
    setPasswordUserName(null);
  };

  return (
    <div className="m-2 flex h-[98%] flex-col gap-2">
      <Card className="flex flex-1 flex-col rounded-sm">
        <CardHeader className="mb-2 flex flex-row items-center justify-between">
          <CardTitle>Gestion des utilisateurs</CardTitle>
          <Button onClick={handleCreate}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvel utilisateur
          </Button>
        </CardHeader>
        <CardContent className="flex-1 overflow-auto">
          <UsersTable
            users={users || []}
            isLoading={isLoading}
            onEdit={handleEdit}
            onPasswordChange={handlePasswordChange}
            onRefetch={refetch}
          />
        </CardContent>
      </Card>

      <UserDialog
        open={isDialogOpen}
        onClose={handleClose}
        userId={selectedUserId}
        onSuccess={handleSuccess}
      />

      <PasswordDialog
        open={isPasswordDialogOpen}
        onClose={handlePasswordDialogClose}
        userId={passwordUserId}
        userName={passwordUserName}
      />
    </div>
  );
}
