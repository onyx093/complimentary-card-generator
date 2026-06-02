import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { unauthorized } from "next/navigation";
import { getAuthSession } from "../actions/auth";

export default async function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  if (!session) {
    return unauthorized();
  }

  return (
    <div className="flex bg-[#F7F4F5]">
      <SidebarProvider>
        <div className="hidden lg:block">
          <AppSidebar user={session.user} />
        </div>
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
