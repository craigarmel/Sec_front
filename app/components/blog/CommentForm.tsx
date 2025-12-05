"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { sanitizeComment } from "@/lib/utils";

type CommentFormProps = {
  readonly onSubmit: (comment: string) => void;
  readonly loading?: boolean;
  readonly placeholder?: string;
};

export default function CommentForm({
  onSubmit,
  loading = false,
  placeholder = "Votre commentaire...",
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
    // Sanitize le commentaire avant de l'envoyer
    const sanitizedComment = sanitizeComment(comment.trim());
    onSubmit(sanitizedComment);
    setComment("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col gap-3 bg-white/80 rounded shadow p-5 my-4"
    >
      <label htmlFor="comment" className="font-medium text-gray-800">
        Ajouter un commentaire
      </label>
      <Textarea
        id="comment"
        value={comment}
        onChange={handleChange}
        placeholder={placeholder}
        rows={4}
        className="resize-none"
        disabled={loading}
        autoFocus
        maxLength={800}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={loading || !comment.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {loading ? "Publication..." : "Publier"}
        </Button>
      </div>
    </form>
  );
}
