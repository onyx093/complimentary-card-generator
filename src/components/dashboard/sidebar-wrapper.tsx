"use client";

import { useAuth } from "@/providers/AuthProvider";
import AppSidebar from "./sidebar";

export default function SidebarWrapper() {
  const { session } = useAuth();
  return (
    <>
      <AppSidebar user={session?.user} />
    </>
  );
}
