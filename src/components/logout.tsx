'use client';

import { authClient } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export function Logout() {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut();
    router.push('/');
  };

  return (
    <Button variant="ghost" onClick={handleLogout}>
      Logout <LogOut className="size-4" />
    </Button>
  );
}
