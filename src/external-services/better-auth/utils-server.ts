'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from './auth';
import { secureLogger } from '@/lib/logger';

// Basic session retrieval
export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  return session;
};

// Get user with error handling
export const getUserWithErrorHandling = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return { user: null, error: 'No active session' };
    }

    return {
      user: session.user,
      session: session.session,
      error: null,
    };
  } catch (error) {
    console.error('Error getting user session:', error);
    return {
      user: null,
      session: null,
      error: 'Failed to retrieve session',
    };
  }
};

// Check if user has specific role
export const checkUserRole = async (requiredRole: string) => {
  const session = await getSession();

  if (!session) {
    return { hasRole: false, user: null };
  }

  const hasRole = session.user.role === requiredRole;

  return {
    hasRole,
    user: session.user,
    currentRole: session.user.role,
  };
};

// Protected action that requires authentication
export const protectedServerAction = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/connexion');
  }

  // Your protected logic here
  return {
    message: `Hello ${session.user.name}!`,
    userId: session.user.id,
    userEmail: session.user.email,
  };
};

// Admin-only action
export const adminOnlyAction = async () => {
  const session = await getSession();

  if (!session) {
    redirect('/connexion');
  }

  if (session.user.role !== 'admin') {
    throw new Error('Access denied: Admin role required');
  }

  // Admin-only logic here
  return {
    message: 'Admin access granted',
    adminUser: session.user,
  };
};

// Get user profile with additional data
export const getUserProfile = async () => {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
    emailVerified: session.user.emailVerified,
    createdAt: session.user.createdAt,
    updatedAt: session.user.updatedAt,
    image: session.user.image,
    // Session info
    sessionId: session.session.id,
    sessionExpiresAt: session.session.expiresAt,
    lastActivity: session.session.updatedAt,
  };
};

// Check authentication status (boolean)
export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session;
};

// Check if user is admin (boolean)
export const isAdmin = async (): Promise<boolean> => {
  const session = await getSession();
  return session?.user?.role === 'admin';
};

// Middleware helper - Check auth without redirect
export const checkAuthForMiddleware = async () => {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return {
      isAuthenticated: !!session?.user,
      isAdmin: session?.user?.role === 'admin',
      user: session?.user || null,
    };
  } catch (error) {
    secureLogger.error('Error in checkAuthForMiddleware', error);
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    };
  }
};
