import { authRedirect } from '@/lib/auth-redirect';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function AdminPage() {
  return <div>Admin page</div>;
}
