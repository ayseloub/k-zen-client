import { NextRequest, NextResponse } from 'next/server';

const PROTECTED_ROUTES = [
  '/user',
  '/daftar-posisi',
];

const AUTH_ROUTES = [
  '/auth/login',
  '/auth/register',
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  if (isProtected && !token) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const isAuthRoute = AUTH_ROUTES.some((route) => pathname === route);
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/user/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/user/:path*',
    '/daftar-posisi/:path*',
    '/auth/login',
    '/auth/register',
  ],
};