import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  Inbox,
  LayoutDashboard,
  LogOut,
  Package,
  RefreshCcw,
  Truck,
  UserPlus,
  Users,
} from 'lucide-react';
import { NavUser } from './nav-user';
import Link from 'next/link';
import SidebarButton from './sidebar-button';
import RefreshButton from './refresh-button';

const adminItems = [
  {
    title: 'Utilisateurs',
    url: '#',
    icon: UserPlus,
  },
];

const items = [
  {
    title: 'Dashboard',
    url: '/app',
    icon: LayoutDashboard,
  },
  {
    title: 'Commandes',
    url: '/app/commandes',
    icon: Inbox,
  },
  {
    title: 'Chargements',
    url: '/app/chargements',
    icon: Package,
  },
  {
    title: 'Livreurs',
    url: '/app/livreurs',
    icon: Truck,
  },
  {
    title: 'Clients',
    url: '/app/clients',
    icon: Users,
  },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>Tallin Pi</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-2">
              {items.map((item) => (
                <SidebarButton
                  key={item.title}
                  title={item.title}
                  url={item.url}
                  icon={<item.icon />}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin */}
        <SidebarSeparator className="my-4" />
        <SidebarGroup>
          <SidebarGroupLabel>Administration</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarMenuItem>
                <RefreshButton />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
