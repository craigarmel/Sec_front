import Link from "next/link";
import Image from "next/image";

type ArticleDisplayProps = {
  title: string;
  description: string;
  imageUrl?: string;
  link: string;
  date?: string;
  author?: string;
};

export default function ArticleDisplay({
  title,
  description,
  imageUrl,
  link,
  date,
  author,
}: ArticleDisplayProps) {
  return (
    <div>
      {imageUrl && (
        <div className="w-full h-56 mb-4 relative overflow-hidden rounded">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Image
              width={1080}
              height={1080}
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full transition-transform hover:scale-105 duration-200"
              style={{ maxHeight: "224px" }}
            />
          </Link>
        </div>
      )}
      <header>
        <h1 className="text-3xl font-bold mb-2">
          <Link
            href={link}
            className="hover:underline underline-offset-4 transition-colors duration-200"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </Link>
        </h1>
        {date && (
          <span className="text-sm text-gray-500">
            {date}
            {author && <> &middot; {author}</>}
          </span>
        )}
      </header>
      <section className="mt-4 text-gray-700">{description}</section>
    </div>
  );
}
