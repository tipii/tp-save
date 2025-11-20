import { Session } from '@/external-services/better-auth/auth-client';
import { Role } from '@/lib/constants';
import { NextRequest, NextResponse } from 'next/server';

// Helper function to get session
export async function getAuthSession(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/auth/get-session`, {
    method: 'GET',
    headers: {
      cookie: request.headers.get('cookie') || '',
    },
  });

  const session: Session = await res.json();

  return session;
}

// Helper function: Redirect if not authenticated
export function requireAuth(request: NextRequest, session: Session | null, redirectTo = '/') {
  if (!session?.user) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return null; // Continue
}

// Helper function: Redirect if not admin
export function requireAdmin(request: NextRequest, session: Session | null, redirectTo = '/') {
  if (!session?.user || session.user.role !== Role.ADMIN) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return null; // Continue
}

// Helper function: Redirect based on user type
export function requireUserType(
  request: NextRequest,
  session: Session | null,
  allowedTypes: Role[],
  redirectTo = '/',
) {
  if (!session?.user || !allowedTypes.includes(session.user.role as Role)) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return null; // Continue
}

// Helper function: Redirect if already authenticated
export function requireGuest(request: NextRequest, session: Session | null, redirectTo = '/') {
  if (session?.user) {
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }
  return null; // Continue
}
