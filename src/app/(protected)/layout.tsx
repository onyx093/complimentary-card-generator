import SidebarWrapper from "@/components/dashboard/sidebar-wrapper";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/providers/AuthProvider";

export default async function ProtectedRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="flex bg-[#F7F4F5]">
        <SidebarProvider>
          <div className="hidden lg:block">
            <SidebarWrapper />
          </div>
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-4">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </div>
    </AuthProvider>
  );
}
