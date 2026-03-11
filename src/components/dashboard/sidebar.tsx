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

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type AppSidebarProps = {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null | undefined;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function AppSidebar({ user }: AppSidebarProps) {
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

        {/* <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <User2 /> Username
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter> */}
        <SidebarFooter className="border-2 border-white rounded-lg p-2 bg-accent">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.image ?? undefined} alt={user.name} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
}
