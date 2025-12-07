"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { sanitizeText } from "@/lib/utils";
import { Calendar, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type CommentCardProps = {
  readonly author: {
    readonly name: string;
    readonly avatarUrl?: string;
  };
  readonly content: string;
  readonly date: string;
  readonly highlighted?: boolean;
};

export default function CommentCard({
  author,
  content,
  date,
  highlighted = false,
}: CommentCardProps) {
  const formatDate = (dateString: string) => {
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

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-md ${
        highlighted
          ? "border-2 border-indigo-500 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950/30 dark:to-blue-950/30 shadow-md"
          : "border bg-card hover:border-indigo-200 dark:hover:border-indigo-800"
      }`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage src={author.avatarUrl} alt={author.name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                {getInitials(author.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-base">{sanitizeText(author.name)}</p>
                {highlighted && (
                  <Badge variant="default" className="bg-indigo-600 text-white text-xs">
                    <Star className="h-3 w-3 mr-1" />
                    Mis en avant
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(date)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="mb-4" />
        <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
          {sanitizeText(content)}
        </p>
      </CardContent>
    </Card>
  );
}
