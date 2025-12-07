"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LogOut, Shield, Users, FileText, Settings, BarChart3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { authApi, postsApi, usersApi, commentsApi, type User, type Post } from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const menuItems = [
  {
    title: "Accueil",
    url: "/",
    icon: Home,
  },
  {
    title: "Articles",
    url: "/articles",
    icon: FileText,
  },
  {
    title: "Utilisateurs",
    url: "#",
    icon: Users,
  },
  {
    title: "Statistiques",
    url: "#",
    icon: BarChart3,
  },
  {
    title: "Paramètres",
    url: "#",
    icon: Settings,
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalComments: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await authApi.getSession();
        if (session.user) {
          setUser(session.user);
          
          // Load stats
          try {
            const [users, posts] = await Promise.all([
              usersApi.getAll(),
              postsApi.getAll(),
            ]);
            
            const totalComments = posts.reduce((acc, post) => acc + (post.comments?.length || 0), 0);
            
            setStats({
              totalUsers: users.length,
              totalPosts: posts.length,
              totalComments,
            });

            // Recent activity (last 3 posts)
            const recentPosts = posts
              .sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                // Si les dates sont invalides, les mettre à la fin
                if (isNaN(dateA.getTime())) return 1;
                if (isNaN(dateB.getTime())) return -1;
                return dateB.getTime() - dateA.getTime();
              })
              .slice(0, 3)
              .map(post => ({
                type: 'post',
                message: `Nouvel article: "${post.title}"`,
                time: post.createdAt,
              }));
            
            setRecentActivity(recentPosts);
          } catch (err) {
            console.error("Error loading stats:", err);
          }
        }
      } catch (error) {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [router]);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      toast.success("Déconnexion réussie");
      router.push("/");
      router.refresh();
    } catch (error) {
      toast.error("Erreur lors de la déconnexion");
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

  if (loading) {
    return (
      <div className="flex h-screen">
        <Sidebar>
          <SidebarContent>
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-64 w-full" />
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8">
          <Skeleton className="h-12 w-64 mb-4" />
          <Skeleton className="h-32 w-full" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Sidebar className="border-r">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2 px-3 py-2">
              <Link href="/" className="flex items-center gap-2 hover:underline">
                <Shield className="h-5 w-5 text-indigo-600" />
                <span className="font-bold text-lg">SecureBlog Admin</span>
              </Link>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <Separator className="my-4" />

          {user && (
            <SidebarGroup>
              <SidebarGroupContent>
                <Card className="m-3 border-0 bg-muted/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-indigo-600 text-white">
                          {getUserInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="w-full justify-center">
                      {user.role}
                    </Badge>
                  </CardContent>
                </Card>
                <SidebarMenuItem>
                  <Button
                    variant="ghost"
                    className="w-full justify-start mx-3"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Déconnexion
                  </Button>
                </SidebarMenuItem>
              </SidebarGroupContent>
            </SidebarGroup>
          )}
        </SidebarContent>
      </Sidebar>

      <main className="flex-1 overflow-y-auto">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="flex h-14 items-center gap-4 px-4">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Tableau de bord Administrateur
              </h1>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <div>
            <p className="text-muted-foreground">
              Gérez votre plateforme et surveillez l&apos;activité
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Total Utilisateurs</CardDescription>
                <CardTitle className="text-3xl">{stats.totalUsers}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Utilisateurs enregistrés
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Articles Publiés</CardDescription>
                <CardTitle className="text-3xl">{stats.totalPosts}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Articles sur la plateforme
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Commentaires</CardDescription>
                <CardTitle className="text-3xl">{stats.totalComments}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Commentaires totaux
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Activité</CardDescription>
                <CardTitle className="text-3xl">100%</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Système opérationnel
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Activité récente</CardTitle>
                <CardDescription>Dernières actions sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent>
                {recentActivity.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune activité récente</p>
                ) : (
                  <div className="space-y-4">
                    {recentActivity.map((activity, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <div className={`h-2 w-2 rounded-full ${
                          activity.type === 'post' ? 'bg-green-500' : 
                          activity.type === 'comment' ? 'bg-blue-500' : 
                          'bg-purple-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.message}</p>
                          <p className="text-xs text-muted-foreground">
                            {activity.time ? (() => {
                              const date = new Date(activity.time);
                              return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                hour: "2-digit",
                                minute: "2-digit",
                              });
                            })() : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Actions rapides</CardTitle>
                <CardDescription>Accès rapide aux fonctionnalités</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="h-20 flex-col">
                    <FileText className="h-5 w-5 mb-2" />
                    Nouvel article
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Users className="h-5 w-5 mb-2" />
                    Gérer utilisateurs
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <BarChart3 className="h-5 w-5 mb-2" />
                    Statistiques
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Settings className="h-5 w-5 mb-2" />
                    Paramètres
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
