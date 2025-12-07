"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NavigationMenu, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Newspaper, LogOut, User, Shield } from "lucide-react";
import { authApi, type User as UserType } from "@/lib/api";
import { isAdmin } from "@/lib/auth";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const loadUser = async () => {
      try {
        const session = await authApi.getSession();
        if (isMounted) {
          // Mettre à jour l'utilisateur seulement si la session est valide
          if (session.authenticated && session.user) {
            setUser(session.user);
          } else {
            // Session non authentifiée
            setUser(null);
          }
        }
      } catch (error: unknown) {
        // Ne pas perdre la session en cas d'erreur réseau temporaire
        // Seulement mettre à null si c'est une erreur 401 (non autorisé)
        const apiError = error as { status?: number; message?: string };
        if (apiError.status === 401) {
          // Session réellement expirée
          if (isMounted) {
            setUser(null);
          }
        }
        // Pour les autres erreurs (réseau, etc.), garder l'état actuel
        // Ne pas mettre user à null pour éviter de perdre la session
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadUser();

    // Refresh user on focus (when coming back from login or tab switch)
    const handleFocus = () => {
      if (isMounted) {
        loadUser();
      }
    };
    window.addEventListener('focus', handleFocus);
    
    // Also check periodically (every 2 minutes - moins agressif pour éviter les problèmes)
    const interval = setInterval(() => {
      if (isMounted) {
        loadUser();
      }
    }, 120000);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setUser(null);
      toast.success("Déconnexion réussie");
      router.push("/");
      router.refresh();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Erreur lors de la déconnexion";
      toast.error(errorMessage);
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Correction: fix header background by setting an explicit background (transparent or with color)
  // or use bg-inherit to avoid offset/overlay glitches, and set a suitable height.
  // Also, move the padding/width from the div to the header so the background stretches the full width.

  return (
    <header className="w-full bg-indigo-950/90 dark:bg-slate-950/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-semibold tracking-tight text-white">
          SecureBlog
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="hidden md:flex gap-6 text-sm font-medium text-white">
            <Link href="/articles" className="hover:text-white/80 transition">
              <Newspaper />
            </Link>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="hidden md:flex gap-3 items-center">
          {loading && <div className="w-8 h-8 animate-pulse bg-white/20 rounded-full" />}
          {!loading && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback className="bg-indigo-600 text-white">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Role: {user.role}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/user/dashboard" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Mon tableau de bord
                  </Link>
                </DropdownMenuItem>
                {isAdmin(user) && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard" className="cursor-pointer">
                      <Shield className="mr-2 h-4 w-4" />
                      Administration
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {!loading && !user && (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                  S&apos;inscrire
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
