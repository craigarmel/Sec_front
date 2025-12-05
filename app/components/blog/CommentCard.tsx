import { Card, CardHeader, CardContent, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { sanitizeText } from "@/lib/utils"

type CommentCardProps = {
  readonly author: {
    readonly name: string
    readonly avatarUrl?: string
  }
  readonly content: string
  readonly date: string
  readonly highlighted?: boolean
}

export default function CommentCard({
  author,
  content,
  date,
  highlighted = false,
}: CommentCardProps) {
  return (
    <Card
      className={`w-full max-w-2xl mx-auto my-4 shadow ${
        highlighted
          ? "border-2 border-blue-500 bg-blue-50"
          : "border border-gray-200"
      }`}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-10 h-10">
          <AvatarImage src={author.avatarUrl} />
          <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-base">{sanitizeText(author.name)}</div>
          <div className="text-xs text-muted-foreground">{sanitizeText(date)}</div>
        </div>
        {highlighted && (
          <span className="ml-auto text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 font-medium">
            Mis en avant
          </span>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-700">
          {sanitizeText(content)}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
