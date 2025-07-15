import { AppSidebar } from '@/components/admin/sidebar/sidebar';

import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Bell, Search } from 'lucide-react';
import type { Metadata } from 'next';
import { APP_ALLOWED_ROLES, authRedirect } from '@/lib/auth-redirect';
import BreadcrumbAdmin from '@/components/admin/shared/breadcrumb/breadcrumb';
import { BreadcrumbProvider } from '@/components/admin/shared/breadcrumb/breadcrumb-context';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await authRedirect({
    allowedRoles: APP_ALLOWED_ROLES,
  });
  return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-200 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <BreadcrumbAdmin />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon">
                <Search />
                <span className="sr-only">Rechercher</span>
              </Button>
              <Button variant="outline" size="icon">
                <Bell />
                <span className="sr-only">Notifications</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 bg-slate-50">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </BreadcrumbProvider>
  );
}
