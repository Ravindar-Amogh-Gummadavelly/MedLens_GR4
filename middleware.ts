import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Never intercept during production build phase or internal Next static page collection
  if (
    process.env.NEXT_PHASE === 'phase-production-build' ||
    request.headers.get('x-nextjs-data') ||
    request.headers.get('user-agent')?.includes('Next.js')
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get('medlens_session')?.value;
  const { pathname } = request.nextUrl;

  // Public paths & internal Next.js assets
  if (
    pathname === '/login' ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    if (token && pathname === '/login') {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  // Protected paths for browser navigation
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
