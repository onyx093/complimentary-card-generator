import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-[#F7F4F5]">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <SidebarInset>
          {/* Optional top bar */}
          <header className="flex h-18 items-center gap-2 border-b ">
            <SidebarTrigger />
            <Header />
          </header>

          <main className="flex-1 p-4 overflow-y-auto">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
