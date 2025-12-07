"use client";

import Link from "next/link";
import Image from "next/image";
import { sanitizeText } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Calendar, User, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArticleDisplayProps = {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly link: string;
  readonly date?: string;
  readonly author?: string;
};

export default function ArticleDisplay({
  title,
  description,
  imageUrl,
  link,
  date,
  author,
}: ArticleDisplayProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[ArticleDisplay] No date provided');
      }
      return "";
    }
    const date = new Date(dateString);
    // Vérifier si la date est valide
    if (isNaN(date.getTime())) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[ArticleDisplay] Invalid date:', dateString);
      }
      return "";
    }
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  
  // Debug en développement
  if (process.env.NODE_ENV === 'development') {
    console.log('[ArticleDisplay] Props:', { author, date, dateType: typeof date });
  }

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const readingTime = Math.ceil(description.split(" ").length / 200);

  return (
    <article className="space-y-6">
      {/* Image */}
      {imageUrl && (
        <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-xl">
          <Image
            width={1200}
            height={600}
            src={imageUrl}
            alt={title}
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
            Article
          </Badge>
          <Badge variant="outline">Cybersécurité</Badge>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
          {sanitizeText(title)}
        </h1>
        
        {/* Meta Information */}
        <Card className="bg-muted/50 border-0">
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {author && author.trim() && (
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-indigo-100 text-indigo-600 text-xs">
                      {getInitials(author)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-foreground">{sanitizeText(author)}</span>
                </div>
              )}
              {date && (() => {
                const formattedDate = formatDate(date);
                return formattedDate ? (
                  <>
                    {author && author.trim() && <Separator orientation="vertical" className="h-4" />}
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                  </>
                ) : null;
              })()}
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min de lecture</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </header>

      {/* Content */}
      <section className="prose prose-lg dark:prose-invert max-w-none">
        <div className="text-lg leading-relaxed text-muted-foreground">
          {sanitizeText(description)}
        </div>
      </section>

      {/* Share Section */}
      <Card className="bg-muted/30 border-0">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span>Partager cet article</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Twitter
              </Button>
              <Button variant="outline" size="sm">
                LinkedIn
              </Button>
              <Button variant="outline" size="sm">
                Copier le lien
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
}
