import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings'];
// Define the routes that should not be accessible if already authenticated
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  // Try to get the auth cookie.
  // Checks for standard email/password tokens or the better-auth Google OAuth session token
  const hasAuthCookie = request.cookies.has('access_token') || request.cookies.has('refresh_token') || request.cookies.has('session') || request.cookies.has('better-auth.session_token');
  
  const { pathname } = request.nextUrl;

  // 1. Check if the user is trying to access a protected route without being authenticated
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
  
  if (isProtectedRoute && !hasAuthCookie) {
    // Redirect to login page, saving the original url they tried to visit
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Check if an authenticated user is trying to access login/register pages
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  
  if (isAuthRoute && hasAuthCookie) {
    // Redirect them to the dashboard or home page
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Allow the request to proceed normally
  return NextResponse.next();
}

// Configure which paths the middleware should run on
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
};
