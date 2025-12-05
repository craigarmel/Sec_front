"use client";

import { useState } from "react";
import CommentCard from "../../components/blog/CommentCard";
import CommentForm from "@/app/components/blog/CommentForm";
import ArticleDisplay from "@/app/components/blog/ArticleDisplay";
import SimilarArticles from "@/app/components/blog/SimilarArticles";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

const fakeArticle = {
  id: 1,
  title: "Comprendre React : Les bases indispensables",
  description:
    "Dans cet article, découvrez les fondements de React pour bien démarrer le développement front-end moderne.",
  imageUrl: "/images/article.jpg",
  link: "/articles/comprendre-react",
  date: "2024-06-10",
  author: "Alice Martin",
  comments: [
    {
      author: {
        name: "Jean Dupont",
        avatarUrl: "/images/avatar.jpg",
      },
      content:
        "Super article, clair et concis ! Merci beaucoup pour le partage.",
      date: "2024-06-11",
      highlighted: true,
    },
    {
      author: {
        name: "Sophie Durand",
        avatarUrl: "/images/avatar.jpg",
      },
      content: "Merci pour ce résumé, c’est parfait pour les débutants.",
      date: "2024-06-12",
      highlighted: false,
    },
    {
      author: {
        name: "Sophie Durand",
        avatarUrl: "/images/avatar.jpg",
      },
      content: "Merci pour ce résumé, c’est parfait pour les débutants.",
      date: "2024-06-12",
      highlighted: false,
    },
    {
      author: {
        name: "Sophie Durand",
        avatarUrl: "/images/avatar.jpg",
      },
      content: "Merci pour ce résumé, c’est parfait pour les débutants.",
      date: "2024-06-12",
      highlighted: false,
    }
  ],
};

const similarArticles = [
  {
    title: "Sécuriser vos mots de passe en 2024",
    description:
      "Découvrez les nouvelles tendances et techniques pour protéger vos mots de passe et vos comptes en ligne cette année.",
    imageUrl: "/images/article.jpg",
    link: "/articles/2",
    date: "2024-05-21",
    author: "Alice Martin",
  },
  {
    title: "Top 10 des failles de sécurité à surveiller",
    description:
      "Un tour d'horizon des menaces les plus courantes et comment vous en prémunir efficacement sur internet.",
    imageUrl: "/images/article.jpg",
    link: "/articles/3",
    date: "2024-04-18",
    author: "Jean Dumont",
  },
  {
    title: "L'importance des mises à jour logicielles",
    description:
      "Pourquoi garder vos systèmes à jour est essentiel pour la sécurité de vos données.",
    imageUrl: "/images/article.jpg",
    link: "/articles/4",
    date: "2024-03-22",
    author: "Laurent Petit",
  },
];

export default function ArticlePage() {
  const [comments, setComments] = useState(fakeArticle.comments);
  const [loading, setLoading] = useState(false);

  // Handles new comment submission
  const handleAddComment = (newCommentValue: string) => {
    if (!newCommentValue.trim()) return;
    setLoading(true);

    // Simulate async request
    setTimeout(() => {
      const newComment = {
        author: {
          name: "Utilisateur",
          avatarUrl: "/avatars/default.png",
        },
        content: newCommentValue,
        date: new Date().toISOString().slice(0, 10),
        highlighted: false,
      };
      setComments([newComment, ...comments]);
      setLoading(false);
    }, 600);
  };

  return (
    <div>
        <div className="max-w-2xl mx-auto px-20 py-8 space-y-8">
        <ArticleDisplay
            title={fakeArticle.title}
            description={fakeArticle.description}
            imageUrl={fakeArticle.imageUrl}
            link="#"
            date={fakeArticle.date}
            author={fakeArticle.author}
        />
        <section>
            <h2 className="text-lg font-semibold mb-2">Commentaires</h2>
            <CommentForm onSubmit={handleAddComment} loading={loading} />
            <div className="space-y-4 mt-4">
            {comments.length === 0 ? (
                <div className="text-gray-500 text-center">Aucun commentaire pour le moment.</div>
            ) : (
                comments.map((comment, idx) => (
                <CommentCard
                    key={idx}
                    author={comment.author}
                    content={comment.content}
                    date={comment.date}
                    highlighted={comment.highlighted}
                />
                ))
            )}
            </div>
        </section>
        <section>
            <SimilarArticles articles={similarArticles} />
        </section>
        </div>
    </div>
  );
}

