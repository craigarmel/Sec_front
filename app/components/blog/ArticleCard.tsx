"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";
import { sanitizeText } from "@/lib/utils";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type ArticleCardProps = {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly link: string;
  readonly date?: string;
  readonly author?: string;
};

export default function ArticleCard({
  title,
  description,
  imageUrl,
  link,
  date,
  author,
}: ArticleCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
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

  const getInitials = (name?: string) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group h-full flex flex-col overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border-0 bg-white dark:bg-slate-800">
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <Link href={link}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-slate-900 backdrop-blur-sm">
              Nouveau
            </Badge>
          </div>
        </div>
      )}
      <CardHeader className="flex-1">
        <CardTitle className="line-clamp-2 group-hover:text-indigo-600 transition-colors">
          <Link href={link} className="hover:underline underline-offset-4">
            {sanitizeText(title)}
          </Link>
        </CardTitle>
        {(date || author) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
            {date && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(date)}</span>
              </div>
            )}
            {author && (
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className="text-xs bg-indigo-100 text-indigo-600">
                    {getInitials(author)}
                  </AvatarFallback>
                </Avatar>
                <span>{sanitizeText(author)}</span>
              </div>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription className="line-clamp-3 text-base">
          {sanitizeText(description)}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-4">
        <Button variant="ghost" className="w-full group/btn" asChild>
          <Link href={link} className="flex items-center justify-center gap-2">
            Lire l&apos;article
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
