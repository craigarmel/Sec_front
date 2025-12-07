"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Home, LogOut, User, FileText, BookOpen, Heart, MessageSquare } from "lucide-react";
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
import { authApi, postsApi, type User, type Post } from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const menuItems = [
  {
    title: "Accueil",
    url: "/",
    icon: Home,
  },
  {
    title: "Mes articles",
    url: "/articles",
    icon: FileText,
  },
  {
    title: "Favoris",
    url: "#",
    icon: Heart,
  },
  {
    title: "Commentaires",
    url: "#",
    icon: MessageSquare,
  },
];

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [stats, setStats] = useState({
    myPosts: 0,
    myComments: 0,
    favorites: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const session = await authApi.getSession();
        if (session.user) {
          setUser(session.user);
          
          // Load user's posts
          try {
            const allPosts = await postsApi.getAll();
            const myPosts = allPosts.filter(post => post.authorId === session.user.id);
            setUserPosts(myPosts);
            
            const myComments = allPosts.reduce((acc, post) => {
              return acc + (post.comments?.filter(c => c.authorId === session.user.id).length || 0);
            }, 0);
            
            setStats({
              myPosts: myPosts.length,
              myComments,
              favorites: 0, // TODO: Implement favorites
            });
          } catch (err) {
            console.error("Error loading user data:", err);
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
                <User className="h-5 w-5 text-indigo-600" />
                <span className="font-bold text-lg">Mon Espace</span>
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
                Bienvenue, {user?.name} !
              </h1>
            </div>
          </div>
        </div>
        <div className="p-8 space-y-8">
          <div>
            <p className="text-muted-foreground">
              Gérez vos articles, commentaires et favoris depuis votre tableau de bord
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Mes Articles</CardDescription>
                <CardTitle className="text-3xl">{stats.myPosts}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Articles que j&apos;ai publiés
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Mes Commentaires</CardDescription>
                <CardTitle className="text-3xl">{stats.myComments}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Commentaires que j&apos;ai postés
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardDescription>Favoris</CardDescription>
                <CardTitle className="text-3xl">{stats.favorites}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Articles sauvegardés
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="recent" className="space-y-4">
            <TabsList>
              <TabsTrigger value="recent">Articles récents</TabsTrigger>
              <TabsTrigger value="comments">Mes commentaires</TabsTrigger>
              <TabsTrigger value="favorites">Favoris</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Mes articles récents</CardTitle>
                  <CardDescription>
                    Articles que vous avez publiés récemment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {userPosts.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground">Vous n&apos;avez pas encore publié d&apos;article</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userPosts.slice(0, 5).map((post) => (
                        <Link key={post.id} href={`/articles/${post.id}`}>
                          <div className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                            <BookOpen className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-medium">{post.title}</p>
                              <p className="text-sm text-muted-foreground">
                                Publié le {post.createdAt ? (() => {
                                  const date = new Date(post.createdAt);
                                  return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                  });
                                })() : ""}
                              </p>
                            </div>
                            <Badge variant="secondary">Publié</Badge>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="comments" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Mes commentaires</CardTitle>
                  <CardDescription>
                    Vos commentaires sur les articles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {stats.myComments === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                      <p className="text-muted-foreground">Vous n&apos;avez pas encore commenté d&apos;article</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {userPosts.flatMap(post => 
                        (post.comments || [])
                          .filter(c => c.authorId === user?.id)
                          .map(comment => (
                            <Link key={comment.id} href={`/articles/${post.id}`}>
                              <div className="flex items-start gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer">
                                <MessageSquare className="h-5 w-5 text-muted-foreground mt-1" />
                                <div className="flex-1">
                                  <p className="font-medium line-clamp-2">{comment.content}</p>
                                  <p className="text-sm text-muted-foreground">Sur "{post.title}"</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {comment.createdAt ? (() => {
                                      const date = new Date(comment.createdAt);
                                      return isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                      });
                                    })() : ""}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="favorites" className="space-y-4">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Mes favoris</CardTitle>
                  <CardDescription>
                    Articles que vous avez sauvegardés
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg border">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div className="flex-1">
                        <p className="font-medium">Sécurité Web 2024</p>
                        <p className="text-sm text-muted-foreground">Par Alice Martin</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
