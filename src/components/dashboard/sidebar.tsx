'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Links } from '@/lib/enums/links';
import { LogOut } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { useRouter } from 'next/navigation';
import { handleLogout } from '../logout';

export default function AppSidebar() {
  const pathname = usePathname();

  const router = useRouter();

  const isActive = (route: string) => pathname === route;

  return (
    <Sidebar collapsible="icon" className="text-white">
      {/* Header */}
      <SidebarHeader className="px-6 py-8">
        <h1 className="text-xl font-bold group-data-[collapsible=icon]:hidden">
          Cardify
        </h1>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={isActive(Links.DASHBOARD)}
              tooltip="Create Card"
              className="rounded-full data-[active=true]:bg-white data-[active=true]:text-[#4B001F]">
              <Link href={Links.DASHBOARD} className="flex items-center gap-2">
                <Image
                  src="/menu-icon.svg"
                  alt="menu icon"
                  width={20}
                  height={20}
                />
                <span>Create Card</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="py-4 group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => handleLogout(router)}
              className="w-full rounded-full px-4 py-5 text-center bg-white text-[#4B001F] hover:bg-white/70 cursor-pointer">
              <span className="flex items-center gap-2">
                Logout <LogOut className="size-4" />
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
