import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { API_ROUTE_PREFIX, publicRoutes } from '../routes';
import { Links } from './lib/enums/links';

export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  // THIS IS NOT SECURE!
  // This is the recommended approach to optimistically redirect users
  // We recommend handling auth checks in each page/route
  if (
    API_ROUTE_PREFIX &&
    request.nextUrl.pathname.startsWith(API_ROUTE_PREFIX)
  ) {
    return NextResponse.next();
  }
  if (!sessionCookie) {
    if (publicRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(Links.LOGIN, request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public).*)', '/dashboard'],
};
