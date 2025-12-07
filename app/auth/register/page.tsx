"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Loader2, Mail, Lock, User, CheckCircle2 } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/lib/validators/registerSchema";
import { authApi, type ApiError } from "@/lib/api";
import { toast } from "sonner";

export default function Register() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            SecureBlog
          </Link>
        </div>
        <div className="flex justify-center items-center min-h-[calc(100vh-120px)]">
          <RegisterCard />
        </div>
      </div>
    </div>
  );
}

function RegisterCard() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      consent: false,
    },
  });

  const password = form.watch("password");

  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "" };
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasDigits = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    const criteriaCount = [hasUpperCase, hasLowerCase, hasDigits, hasSpecial].filter(Boolean).length;
    
    if (password.length >= 12 && criteriaCount >= 3) {
      return { strength: 3, label: "Fort", color: "bg-green-500" };
    } else if (password.length >= 8 && criteriaCount >= 2) {
      return { strength: 2, label: "Moyen", color: "bg-yellow-500" };
    } else if (password.length > 0) {
      return { strength: 1, label: "Faible", color: "bg-red-500" };
    }
    return { strength: 0, label: "", color: "" };
  };

  const passwordStrength = getPasswordStrength();

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);

    try {
      // Add timeout to prevent infinite loading
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("La requête a pris trop de temps. Vérifiez votre connexion.")), 10000);
      });

      const response = await Promise.race([
        authApi.register(data),
        timeoutPromise,
      ]);
      
      // Backend returns { message: string } on register
      if (response.message) {
        toast.success(response.message || "Compte créé avec succès !");
        router.push("/auth/login");
        return; // Exit early
      }
    } catch (err) {
      const apiError = err as ApiError;
      let errorMessage = "Une erreur est survenue lors de l'inscription";
      
      if (apiError.message) {
        errorMessage = apiError.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }

      // Check if it's a network error
      if (apiError.status === 0 || errorMessage.includes("fetch") || errorMessage.includes("Network")) {
        errorMessage = "Impossible de se connecter au serveur. Vérifiez votre connexion internet et que le serveur est démarré.";
      }
      
      // Handle field-specific errors
      if (apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          form.setError(field as keyof RegisterFormData, {
            message: messages[0],
          });
        });
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-0">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold">Créer un compte</CardTitle>
        <CardDescription>
          Remplissez les informations ci-dessous pour commencer
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nom
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Votre nom"
                      {...field}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="m@exemple.com"
                      {...field}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    Mot de passe
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </FormControl>
                  {password && (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.strength / 3) * 100}%` }}
                          />
                        </div>
                        {passwordStrength.label && (
                          <Badge variant={passwordStrength.strength === 3 ? "default" : "secondary"}>
                            {passwordStrength.label}
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {password.length >= 12 ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                          )}
                          <span>12+ caractères</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {/[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password) && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) ? (
                            <CheckCircle2 className="h-3 w-3 text-green-500" />
                          ) : (
                            <div className="h-3 w-3 rounded-full border border-muted-foreground" />
                          )}
                          <span>3+ critères</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <FormDescription>
                    Minimum 12 caractères avec majuscules, minuscules, chiffres et caractères spéciaux
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmer le mot de passe</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isLoading}
                      className="h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      J&apos;accepte les{" "}
                      <Link
                        href="/legal"
                        className="text-primary hover:underline font-medium"
                      >
                        conditions d&apos;utilisation
                      </Link>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full h-11" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Création...
                </>
              ) : (
                "Créer mon compte"
              )}
            </Button>
          </form>
        </Form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">
              Ou continuer avec
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full h-11" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </Button>
        <CardAction className="text-center">
          <p className="text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </CardAction>
      </CardFooter>
    </Card>
  );
}
