"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Links } from "@/lib/enums/links";
import { publicRoutes } from "../routes";

type Session = typeof authClient.$Infer.Session;

type AuthContextType = {
  session: Session | null;
  isPending: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  isPending: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return; // wait for session to resolve

    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (!session && !isPublicRoute) {
      router.push(Links.LOGIN);
    }

    /* if (session && isPublicRoute) {
      router.push(Links.DASHBOARD); // redirect logged-in users away from auth pages
    } */
  }, [session, isPending, pathname, router]);

  return (
    <AuthContext.Provider value={{ session, isPending }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
