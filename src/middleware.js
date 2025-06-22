import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; 

export { default } from 'next-auth/middleware';

export const config = {
  matcher: [ '/signin', '/signup', '/'], //todo: routes add on later like cart etc
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  const isAuthPage =
    url.pathname === '/signin' ||
    url.pathname === '/signup' ||
    url.pathname === '/' ||
    url.pathname.startsWith('/verify');

  const isDashboardPage = url.pathname.startsWith('/dashboard');

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If user is not authenticated and trying to access dashboard, redirect to sign-in
  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}
