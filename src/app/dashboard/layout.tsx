import AppSidebar from '@/components/dashboard/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-[#F7F4F5]">
      <SidebarProvider>
        <div className="hidden lg:block">
          <AppSidebar />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 p-4 overflow-y-auto">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
