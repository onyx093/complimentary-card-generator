"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Links } from "@/lib/enums/links";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Logout } from "../logout";

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

  const active = (route: string) => pathname === route;

  // CSS filters to tint SVG images to the target colors:
  // active  → #4B001F (dark maroon, shown on white bg)
  // inactive → #FFF5FA (near-white, shown on dark bg)
  const activeIconFilter =
    "brightness(0) saturate(100%) invert(8%) sepia(80%) saturate(3000%) hue-rotate(315deg) brightness(60%)";
  const inactiveIconFilter =
    "brightness(0) saturate(100%) invert(97%) sepia(6%) saturate(400%) hue-rotate(280deg) brightness(105%)";

  return (
    <>
      <Sidebar className="w-65 bg-linear-to-b from-[#4B001F] to-[#2A000F] px-6 py-8">
        <h1 className="mb-10 text-xl font-bold text-white">Cardify</h1>
        <SidebarHeader />

        <SidebarContent>
          <SidebarMenu className="space-y-1 p-2">
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={Links.DASHBOARD}
                  className={`flex gap-2 px-4 py-2 transition ${
                    active(Links.DASHBOARD)
                      ? "bg-white text-[#4B001F] hover:bg-white hover:text-[#4B001F]"
                      : "text-[#FFF5FA] hover:bg-transparent hover:text-white hover:ring-1 hover:ring-white"
                  }`}
                >
                  <Image
                    src="/menu-icon.svg"
                    alt="menu icon"
                    width={24}
                    height={24}
                    style={{
                      filter: active(Links.DASHBOARD)
                        ? activeIconFilter
                        : inactiveIconFilter,
                    }}
                  />
                  Create Card
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link
                  href={Links.SAVED_CARDS}
                  className={`flex gap-2 px-4 py-2 transition ${
                    active(Links.SAVED_CARDS)
                      ? "bg-white text-[#4B001F] hover:bg-white hover:text-[#4B001F]"
                      : "text-[#FFF5FA] hover:bg-transparent hover:text-white hover:ring-1 hover:ring-white"
                  }`}
                >
                  <Image
                    src="/download-icon.svg"
                    alt="download icon"
                    width={24}
                    height={24}
                    style={{
                      filter: active(Links.SAVED_CARDS)
                        ? activeIconFilter
                        : inactiveIconFilter,
                    }}
                  />
                  Saved Cards
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Logout
                  classes={`flex gap-2 px-4 py-2 transition ${
                    active(Links.LOGOUT)
                      ? "bg-white text-[#4B001F] hover:bg-white hover:text-[#4B001F]"
                      : "text-[#FFF5FA] hover:bg-transparent hover:text-white hover:ring-1 hover:ring-white"
                  }`}
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
        <SidebarFooter className="bg-accent rounded-lg border-2 border-white p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
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
    </>
  );
}
