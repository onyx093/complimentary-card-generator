/* "use client";

import { Links } from "@/lib/enums/links";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  router.push(Links.DASHBOARD);
} */

import { Button } from "@/components/ui/button";
import { Links } from "@/lib/enums/links";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">
          Cardify - Digital Card Generator
        </h1>
        <p className="text-muted-foreground mt-3 text-base text-balance sm:text-lg">
          Empowering organizations to design smart, branded employee cards in seconds.{" "}
          <Link
            href="https://www.youtube.com/c/codinginflow?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Coding in Flow
          </Link>
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href={Links.DASHBOARD}>Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={Links.LOGIN}>Sign In</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
