"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ArticleCard from "./ArticleCard"

type Article = {
  readonly title: string
  readonly description: string
  readonly imageUrl?: string
  readonly link: string
  readonly date?: string
  readonly author?: string
}

type SimilarArticlesProps = {
  readonly articles: readonly Article[]
}

export default function SimilarArticles({ articles }: SimilarArticlesProps) {
  return (
    <section className="mb-20">
      <h2 className="text-xl font-semibold text-center mb-2 mt-10">Articles similaires</h2>
      <Carousel>
        <CarouselContent className="gap-4">
          {Array.from({ length: 5 }).map((_, idx) => {
            const article = articles[idx];
            if (!article) return null;
            return (
              <CarouselItem key={`${article.link}-${idx}`} className="sm:basis-1/2 md:basis-1/3">
                <ArticleCard
                  title={article.title}
                  description={article.description}
                  imageUrl={article.imageUrl}
                  link={article.link}
                  date={article.date}
                  author={article.author}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </section>
  )
}
