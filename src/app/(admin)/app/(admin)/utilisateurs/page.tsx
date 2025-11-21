import UtilisateursPageComponent from '@/components/admin/utilisateurs/utilisateurs-page-component.tsx';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Utilisateurs',
};

export default function UtilisateursPage() {
  return <UtilisateursPageComponent />;
}
