import AppSidebar from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /* if (!session) {
    return redirect(Links.LOGIN);
  } */

  return (
    <div className="flex bg-[#F7F4F5]">
      <SidebarProvider>
        <div className="hidden lg:block">
          <AppSidebar user={session?.user} />
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
