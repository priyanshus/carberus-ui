import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup'];
const STATIC_PREFIXES = [
  '/_next',
  '/favicon.ico',
  '/robots.txt',
  '/manifest.json',
  '/images',
  '/fonts',
  '/login',
  '/signup',
  '/api/login',
  '/api/singup' // <-- add public APIs here if needed
];

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

function isStatic(pathname: string) {
  return STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log('Middleware triggered for:', pathname);
  const token = req.cookies.get('token');

  if (isPublic(pathname) || isStatic(pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname); // to redirect after login
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}