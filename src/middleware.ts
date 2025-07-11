import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession, requireAdmin, requireAuth, requireGuest } from '@/lib/middleware-helper';

export async function middleware(request: NextRequest) {
  const session = await getAuthSession(request);
  const { pathname } = request.nextUrl;

  // Guest only routes
  if (pathname.startsWith('/auth')) {
    const guestRedirect = requireGuest(request, session, '/mon-compte');
    if (guestRedirect) return guestRedirect;
  }

  // Checkout routes
  // if (pathname.startsWith('/commande')) {
  //   const authRedirect = requireAuth(request, session, '/auth/login');
  //   if (authRedirect) return authRedirect;
  // }

  // if (pathname.startsWith('/admin')) {
  //   const adminRedirect = requireAdmin(request, session, '/auth/login');
  //   if (adminRedirect) return adminRedirect;
  // }

  return NextResponse.next();
}

export const config = {
  // runtime: 'nodejs',
  matcher: [
    '/auth/:path*',
    // // Authentication required routes
    // '/devis/:path*',
    // '/commande/:path*',
    // '/mon-compte/:path*',
    // // Admin routes
    // '/admin/:path*',
  ],
};
