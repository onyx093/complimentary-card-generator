'use client';

import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Links } from '@/lib/enums/links';

export const handleLogout = async (router: ReturnType<typeof useRouter>) => {
  await authClient.signOut();
  router.push(Links.LOGIN);
};

export function Logout({ classes }: { classes?: string } = {}) {
  const router = useRouter();

  return (
    <span
      className={`w-full cursor-pointer ${classes ?? ''}`}
      onClick={() => handleLogout(router)}>
      Logout <LogOut className="size-4" />
    </span>
  );
}
