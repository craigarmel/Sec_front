"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service in production
    // In production, don't expose stack traces
    if (process.env.NODE_ENV === "production") {
      console.error("Application error:", {
        message: error.message,
        digest: error.digest,
        // Don't log stack trace in production
      });
    } else {
      console.error("Application error:", error);
    }
  }, [error]);

  const isProduction = process.env.NODE_ENV === "production";

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            Une erreur est survenue
          </CardTitle>
          <CardDescription>
            {isProduction
              ? "Une erreur inattendue s'est produite. Veuillez réessayer."
              : error.message}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isProduction && error.stack && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription className="font-mono text-xs whitespace-pre-wrap">
                {error.stack}
              </AlertDescription>
            </Alert>
          )}
          {error.digest && (
            <p className="text-sm text-muted-foreground">
              Code d&apos;erreur: {error.digest}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={reset} variant="outline">
            Réessayer
          </Button>
          <Button asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
