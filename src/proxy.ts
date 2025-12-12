import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';
import { API_ROUTE_PREFIX, publicRoutes } from '../routes';

/* export default auth((req) => {
  const { pathname } = req.nextUrl;

  const publicAuthRoutes = [
    '/api/auth',
    '/auth',
    '/auth/login',
    '/auth/success',
    '/auth/google',
    '/dashboard',
    '/auth/google/login',
    '/api/proxy/auth/google',
  ];

  if (publicAuthRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }
}); */

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
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|public).*)', '/dashboard'],
};
