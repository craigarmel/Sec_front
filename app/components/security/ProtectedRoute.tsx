"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authApi, type User } from "@/lib/api";
import { isAdmin } from "@/lib/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requireAdmin = false,
}: ProtectedRouteProps) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const checkAuth = async () => {
      try {
        const session = await authApi.getSession();
        
        if (!isMounted) return;
        
        if (requireAuth && !session.user) {
          router.push("/auth/login");
          return;
        }

        if (requireAdmin && !isAdmin(session.user)) {
          router.push("/");
          return;
        }

        setUser(session.user);
      } catch (error: unknown) {
        if (!isMounted) return;
        
        // Ne rediriger vers login que si c'est une erreur 401 (non autorisé)
        // Les erreurs réseau ne doivent pas déclencher de redirection
        const apiError = error as { status?: number; message?: string };
        if (requireAuth && apiError.status === 401) {
          router.push("/auth/login");
        } else if (requireAuth) {
          // Pour les autres erreurs, on garde l'état de chargement
          // mais on ne redirige pas immédiatement
          console.warn('Erreur lors de la vérification de session:', apiError.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();
    
    return () => {
      isMounted = false;
    };
  }, [router, requireAuth, requireAdmin]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !user) {
    return null;
  }

  if (requireAdmin && !isAdmin(user)) {
    return null;
  }

  return <>{children}</>;
};
