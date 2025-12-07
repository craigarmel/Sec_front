"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import CommentCard from "../../components/blog/CommentCard";
import CommentForm from "@/app/components/blog/CommentForm";
import ArticleDisplay from "@/app/components/blog/ArticleDisplay";
import SimilarArticles from "@/app/components/blog/SimilarArticles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MessageSquare, TrendingUp, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { postsApi, commentsApi, type Post, type Comment, type ApiError } from "@/lib/api";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [similarPosts, setSimilarPosts] = useState<Array<{
    title: string;
    description: string;
    imageUrl?: string;
    link: string;
    date: string;
    author: string;
  }>>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      if (!postId) return;
      
      setLoading(true);
      setError(null);
      try {
        const postData = await postsApi.getById(postId);
        // Debug: vérifier les données reçues
        if (process.env.NODE_ENV === 'development') {
          console.log('[Article Page] Post data:', {
            id: postData.id,
            title: postData.title,
            author: postData.author,
            createdAt: postData.createdAt,
            createdAtType: typeof postData.createdAt,
          });
        }
        setPost(postData);
        // Comments are included in the post response from backend
        if (postData.comments && Array.isArray(postData.comments)) {
          // Transform comments to match frontend format
          const formattedComments: Comment[] = postData.comments.map((comment: {
            id: string;
            content: string;
            authorId?: string;
            author?: { id: string; name: string };
            createdAt: string;
            updatedAt?: string;
          }): Comment => {
            const authorId = comment.authorId || comment.author?.id || "";
            const authorIdForAuthor = comment.author?.id || comment.authorId || "";
            return {
              id: comment.id,
              content: comment.content,
              authorId,
              author: {
                id: authorIdForAuthor,
                name: comment.author?.name || "Utilisateur",
              },
              postId: postData.id,
              createdAt: comment.createdAt,
              updatedAt: comment.updatedAt || comment.createdAt,
            };
          });
          setComments(formattedComments);
        } else {
          setComments([]);
        }
        
        // Load similar posts (all posts except current one)
        const allPosts = await postsApi.getAll();
        const similar = allPosts
          .filter(p => p.id !== postId)
          .slice(0, 3)
          .map(p => ({
            title: p.title,
            description: p.content.length > 150 ? p.content.substring(0, 150) + "..." : p.content,
            imageUrl: p.imageUrl,
            link: `/articles/${p.id}`,
            date: p.createdAt,
            author: p.author?.name || "Auteur inconnu",
          }));
        setSimilarPosts(similar);
      } catch (err) {
        const apiError = err as ApiError;
        const errorMessage = apiError.message || "Erreur lors du chargement de l'article";
        setError(errorMessage);
        if (apiError.status === 404) {
          toast.error("Article non trouvé");
        } else {
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    loadPost();
    
    // Check if user is authenticated for commenting
    const checkAuth = async () => {
      try {
        const session = await authApi.getSession();
        setIsAuthenticated(session.authenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, [postId]);

  const handleAddComment = async (newCommentValue: string) => {
    if (!newCommentValue.trim() || !postId) return;
    setCommentLoading(true);

    try {
      const newComment = await commentsApi.create(postId, {
        content: newCommentValue,
      });
      
      // Recharger l'article pour avoir la liste complète des commentaires à jour
      // Cela garantit que tous les commentaires sont synchronisés avec le backend
      const updatedPost = await postsApi.getById(postId);
      if (updatedPost.comments && Array.isArray(updatedPost.comments)) {
        const formattedComments: Comment[] = updatedPost.comments.map((comment: {
          id: string;
          content: string;
          authorId?: string;
          author?: { id: string; name: string };
          createdAt: string;
          updatedAt?: string;
        }): Comment => {
          const authorId = comment.authorId || comment.author?.id || "";
          const authorIdForAuthor = comment.author?.id || comment.authorId || "";
          return {
            id: comment.id,
            content: comment.content,
            authorId,
            author: {
              id: authorIdForAuthor,
              name: comment.author?.name || "Utilisateur",
            },
            postId: postId,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt || comment.createdAt,
          };
        });
        setComments(formattedComments);
      }
      
      toast.success("Commentaire publié avec succès !");
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError.status === 401
        ? "Vous devez être connecté pour commenter"
        : apiError.message || "Erreur lors de la publication du commentaire";
      
      toast.error(errorMessage);
      
      if (apiError.status === 401) {
        router.push("/auth/login");
      }
    } finally {
      setCommentLoading(false);
    }
  };

  const formatDate = (dateString: string | Date) => {
    if (!dateString) return "";
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Skeleton className="h-96 w-full mb-6" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 py-12">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error || "Article non trouvé"}
            </AlertDescription>
          </Alert>
          <Button asChild className="mt-4">
            <Link href="/articles">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux articles
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/articles">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux articles
          </Link>
        </Button>

        {/* Article Display */}
        <div className="mb-12">
          <ArticleDisplay
            title={post.title}
            description={post.content}
            imageUrl={post.imageUrl}
            link="#"
            date={post.createdAt}
            author={post.author?.name || "Auteur inconnu"}
          />
        </div>

        <Separator className="my-12" />

        {/* Comments Section */}
        <section className="space-y-6">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                    <MessageSquare className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Commentaires</CardTitle>
                    <CardDescription>
                      {comments.length} {comments.length > 1 ? "commentaires" : "commentaire"}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {comments.length} réponses
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isAuthenticated ? (
                <CommentForm onSubmit={handleAddComment} loading={commentLoading} />
              ) : (
                <Card className="border-dashed">
                  <CardContent className="py-8 text-center">
                    <p className="text-muted-foreground mb-4">
                      Vous devez être connecté pour commenter
                    </p>
                    <Button asChild>
                      <Link href="/auth/login">Se connecter</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
              
              {comments.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="py-12 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground text-lg">
                      Aucun commentaire pour le moment.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Soyez le premier à commenter cet article !
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <CommentCard
                      key={comment.id}
                      author={{
                        name: comment.author?.name || "Utilisateur",
                        avatarUrl: undefined,
                      }}
                      content={comment.content}
                      date={comment.createdAt}
                      highlighted={false}
                    />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        <Separator className="my-12" />

        {/* Similar Articles */}
        {similarPosts.length > 0 && (
          <section>
            <SimilarArticles articles={similarPosts} />
          </section>
        )}
      </div>
    </div>
  );
}
