import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('medlens_session')?.value;
  const { pathname } = request.nextUrl;

  // Public paths
  if (
    pathname === '/login' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected paths
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
