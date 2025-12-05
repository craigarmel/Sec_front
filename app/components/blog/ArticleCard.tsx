"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

type ArticleCardProps = {
  title: string
  description: string
  imageUrl?: string
  link: string
  date?: string
  author?: string
}

export default function ArticleCard({
  title,
  description,
  imageUrl,
  link,
  date,
  author,
}: ArticleCardProps) {
  return (
    <Card className="w-full max-w-xl mx-auto overflow-hidden shadow-md bg-white">
      {imageUrl && (
        <div className="w-full h-48 relative">
          <Link href={link}>
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform hover:scale-105 duration-200"
              sizes="(max-width: 768px) 100vw, 600px"
            />
          </Link>
        </div>
      )}
      <CardHeader>
        <CardTitle>
          <Link href={link} className="hover:underline underline-offset-4 transition-colors duration-200">
            {title}
          </Link>
        </CardTitle>
        {date && (
          <span className="text-xs text-muted-foreground">
            {date}{author && <> &middot; {author}</>}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3">{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={link}
          className="text-blue-600 hover:underline underline-offset-4 font-medium transition-colors"
        >
          Lire l&apos;article
        </Link>
      </CardFooter>
    </Card>
  )
}
