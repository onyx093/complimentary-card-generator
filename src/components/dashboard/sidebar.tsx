'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Links } from '@/lib/enums/links';
import { Logout } from '../logout';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (route: string) =>
    pathname === route ? 'bg-white text-[#4B001F]' : 'text-white';

  return (
    <aside className="w-[260px] min-h-screen sticky top-0 bg-linear-to-b from-[#4B001F] to-[#2A000F] px-6 py-8">
      <h1 className="text-white text-xl font-bold mb-10">Cardify</h1>

      <nav className="space-y-4">
        <Link
          href={Links.DASHBOARD}
          className={`flex gap-2 px-4 py-2 rounded-full transition ${isActive(
            Links.DASHBOARD
          )}`}>
          <Image src="/menu-icon.svg" alt="menu icon" width={24} height={24} />
          Create Card
        </Link>
        <Logout
          classes={`flex gap-2 px-4 py-2 rounded-full transition ${isActive(
            Links.LOGOUT
          )}`}
        />
      </nav>
    </aside>
  );
}
