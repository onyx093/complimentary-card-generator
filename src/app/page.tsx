"use client";

import { Links } from "@/lib/enums/links";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push(Links.DASHBOARD);
}
