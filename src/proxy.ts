import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { API_ROUTE_PREFIX, publicRoutes } from "../routes";
import { Links } from "./lib/enums/links";

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (API_ROUTE_PREFIX && request.nextUrl.pathname.startsWith(API_ROUTE_PREFIX)) {
    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return response;
  }

  if (!sessionCookie) {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(Links.LOGIN, request.url));
  }

  if (sessionCookie && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(Links.DASHBOARD, request.url));
  }

  const response = NextResponse.next();
  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|public).*)"],
};
