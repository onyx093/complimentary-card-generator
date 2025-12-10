import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const publicAuthRoutes = [
    "/api/auth",
    "/auth",
    "/auth/login",
    "/auth/success",
    "/auth/google",
    "/dashboard",
    "/auth/google/login",
    "/api/proxy/auth/google",
  ];

  if (publicAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isAuthenticated = !!req.auth;
  const isAuthPage = pathname.startsWith("/auth");
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|favicon.ico|public).*)"],
};
