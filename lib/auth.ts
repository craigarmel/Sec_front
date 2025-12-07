/**
 * Authentication utilities and session management
 */

import { authApi, type User, type SessionResponse } from './api';

export interface AuthState {
  user: User | null;
  loading: boolean;
  authenticated: boolean;
}

/**
 * Get current session from server
 * This should be called server-side or in a server component
 */
export async function getServerSession(): Promise<SessionResponse> {
  try {
    return await authApi.getSession();
  } catch (error) {
    return { user: null, authenticated: false };
  }
}

/**
 * Check if user has required role
 */
export function hasRole(user: User | null, role: 'USER' | 'ADMIN'): boolean {
  if (!user) return false;
  return user.role === role || user.role === 'ADMIN';
}

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return hasRole(user, 'ADMIN');
}

/**
 * Check if user owns a resource
 */
export function ownsResource(user: User | null, resourceUserId: string): boolean {
  if (!user) return false;
  return user.id === resourceUserId;
}

/**
 * Check if user can access resource (owner or admin)
 */
export function canAccessResource(
  user: User | null,
  resourceUserId: string
): boolean {
  if (!user) return false;
  return ownsResource(user, resourceUserId) || isAdmin(user);
}

/**
 * Client-side session check
 * Note: This is for UI purposes only. Server-side validation is required.
 */
export async function checkAuth(): Promise<User | null> {
  try {
    const session = await authApi.getSession();
    return session.user;
  } catch {
    return null;
  }
}
