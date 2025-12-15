import { Links } from '@/lib/enums/links';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect(Links.DASHBOARD);
}
