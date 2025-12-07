"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { sanitizeComment } from "@/lib/utils";
import { MessageSquare, AlertCircle, Loader2 } from "lucide-react";

type CommentFormProps = {
  readonly onSubmit: (comment: string) => void;
  readonly loading?: boolean;
  readonly placeholder?: string;
};

export default function CommentForm({
  onSubmit,
  loading = false,
  placeholder = "Partagez vos pensées...",
}: CommentFormProps) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (e.target.value.trim()) {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Merci d'écrire un commentaire avant de publier.");
      return;
    }
    if (comment.trim().length < 3) {
      setError("Votre commentaire doit contenir au moins 3 caractères.");
      return;
    }
    const sanitizedComment = sanitizeComment(comment.trim());
    onSubmit(sanitizedComment);
    setComment("");
    setError("");
  };

  const characterCount = comment.length;
  const maxLength = 800;

  return (
    <Card className="border-2 border-dashed hover:border-solid transition-colors">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
            <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <CardTitle className="text-lg">Ajouter un commentaire</CardTitle>
            <CardDescription>
              Partagez votre avis et participez à la discussion
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Textarea
              id="comment"
              value={comment}
              onChange={handleChange}
              placeholder={placeholder}
              rows={5}
              className="resize-none min-h-[120px]"
              disabled={loading}
              maxLength={maxLength}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {characterCount >= 3 ? (
                  <span className="text-green-600">✓ Longueur valide</span>
                ) : (
                  <span>{3 - characterCount} caractères minimum</span>
                )}
              </span>
              <span>
                {characterCount} / {maxLength}
              </span>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setComment("");
                setError("");
              }}
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading || !comment.trim() || comment.trim().length < 3}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publication...
                </>
              ) : (
                "Publier le commentaire"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
