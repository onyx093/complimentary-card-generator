"use client";

import { authClient } from "@/lib/auth-client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Links } from "@/lib/enums/links";
import dynamic from "next/dynamic";

export const handleLogout = async (router: ReturnType<typeof useRouter>) => {
  await authClient.signOut();
  router.push(Links.LOGIN);
};

function LogoutButton({ classes }: { classes?: string } = {}) {
  const router = useRouter();

  return (
    <span
      className={`flex h-8 w-full cursor-pointer items-center rounded-md text-sm ${classes ?? ""}`}
      onClick={() => handleLogout(router)}
    >
      <LogOut className="size-4" /> Logout
    </span>
  );
}

export const Logout = dynamic(() => Promise.resolve(LogoutButton), {
  ssr: false,
});
