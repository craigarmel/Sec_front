"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ArticleCard from "./ArticleCard";
import { BookOpen } from "lucide-react";

type Article = {
  readonly title: string;
  readonly description: string;
  readonly imageUrl?: string;
  readonly link: string;
  readonly date?: string;
  readonly author?: string;
};

type SimilarArticlesProps = {
  readonly articles: readonly Article[];
};

export default function SimilarArticles({ articles }: SimilarArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="space-y-6">
      <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
              <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <CardTitle className="text-2xl">Articles similaires</CardTitle>
              <CardDescription>
                Découvrez d&apos;autres articles qui pourraient vous intéresser
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {articles.map((article, idx) => (
                <CarouselItem
                  key={`${article.link}-${idx}`}
                  className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full">
                    <ArticleCard
                      title={article.title}
                      description={article.description}
                      imageUrl={article.imageUrl}
                      link={article.link}
                      date={article.date}
                      author={article.author}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </CardContent>
      </Card>
    </section>
  );
}
