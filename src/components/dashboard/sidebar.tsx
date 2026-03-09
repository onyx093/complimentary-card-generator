'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Links } from '@/lib/enums/links';
import { Logout } from '../logout';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import { User2 } from 'lucide-react';

export default function AppSidebar() {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? 'bg-white text-[#4B001F]' : 'text-white';

  return (
    <div className="h-screen">
      <Sidebar className="w-65 min-h-screen sticky top-0 bg-linear-to-b from-[#4B001F] to-[#2A000F] px-6 py-8">
        <h1 className="text-white text-xl font-bold mb-10">Cardify</h1>
        <SidebarHeader />

        <SidebarContent>
          <SidebarMenu className="space-y-4">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={Links.DASHBOARD}
                  className={`flex gap-2 px-4 py-2 rounded-full transition ${isActive(
                    Links.DASHBOARD,
                  )}`}>
                  <Image
                    src="/menu-icon.svg"
                    alt="menu icon"
                    width={24}
                    height={24}
                  />
                  Create Card
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Logout
                  classes={`flex gap-2 px-4 py-2 rounded-full transition ${isActive(
                    Links.LOGOUT,
                  )}`}
                />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User2 /> Username
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
