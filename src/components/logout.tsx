"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Links } from "@/lib/enums/links";

export function Logout({ classes }: { classes?: string } = {}) {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push(Links.LOGIN);
  };

  return (
    <span
      className={`w-full cursor-pointer ${classes ?? ""}`}
      onClick={handleLogout}
    >
      Logout <LogOut className="size-4" />
    </span>
  );
}
