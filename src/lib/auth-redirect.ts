import { auth } from '@/external-services/better-auth/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const APP_ALLOWED_ROLES = ['admin', 'commerciaux', 'secretaire'];
export const APP_LIVRAISON_ALLOWED_ROLES = ['livreur'];

/**
 * Server-side authentication redirect with role-based access control
 * @param redirectTo - Where to redirect after successful auth (optional)
 * @param allowedRoles - Array of roles that are allowed to access the resource
 * @param unauthorizedRedirect - Where to redirect unauthorized users
 */
export async function authRedirect({
  allowedRoles,
  unauthorizedRedirect = '/auth/login',
}: {
  allowedRoles: string[];
  unauthorizedRedirect?: string;
}): Promise<void> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    // Check if session exists
    if (!session || !session.user) {
      redirect(unauthorizedRedirect);
      return;
    }

    // If no role restrictions, allow access
    if (allowedRoles.length === 0) {
      return;
    }

    // Check if user has required role
    const userRole = session.user.role;
    if (!userRole || !allowedRoles.includes(userRole)) {
      redirect(unauthorizedRedirect);
      return;
    }

    // Access granted
  } catch (error) {
    console.error('Auth redirect error:', error);
    redirect(unauthorizedRedirect);
  }
}

/**
 * Simplified version for pages that only need authentication (no role check)
 */
export async function requireAuth(unauthorizedRedirect: string = '/auth/login'): Promise<void> {
  await authRedirect({ allowedRoles: [], unauthorizedRedirect });
}

/**
 * Get current user session safely with error handling
 */
export async function getCurrentUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session?.user || null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

/**
 * Check if current user has specific role
 */
export async function hasRole(requiredRole: string): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.role === requiredRole;
  } catch (error) {
    console.error('Error checking user role:', error);
    return false;
  }
}

/**
 * Check if current user has any of the specified roles
 */
export async function hasAnyRole(requiredRoles: string[]): Promise<boolean> {
  try {
    const user = await getCurrentUser();
    return user?.role ? requiredRoles.includes(user.role) : false;
  } catch (error) {
    console.error('Error checking user roles:', error);
    return false;
  }
}
