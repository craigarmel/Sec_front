import ArticleCard from "../components/blog/ArticleCard";
import Header from "../components/layout/Header";
export default function Articles() {
  const articles = [
    {
      id: 1,
      title: "Comprendre React : Les bases indispensables",
      description: "Dans cet article, découvrez les fondements de React pour bien démarrer le développement front-end moderne.",
      imageUrl: "/images/article.jpg",
      link: "/articles/comprendre-react",
      date: "2024-06-10",
      author: "Alice Martin",
      comments: [
        {
          author: {
            name: "Jean Dupont",
            avatarUrl: "/images/avatar.jpg"
          },
          content: "Super article, clair et concis ! Merci beaucoup pour le partage.",
          date: "2024-06-11",
          highlighted: true,
        },
        {
          author: {
            name: "Sophie Durand",
            avatarUrl: "/avatars/sophie.png"
          },
          content: "Merci pour ce résumé, c’est parfait pour les débutants.",
          date: "2024-06-12",
          highlighted: false,
        }
      ]
    },
    {
      id: 2,
      title: "Utiliser Next.js pour vos projets web modernes",
      description: "Apprenez à tirer parti de Next.js pour construire des applications web performantes et évolutives.",
      imageUrl: "/images/article.jpg",
      link: "/articles/utiliser-nextjs",
      date: "2024-05-28",
      author: "Lucas Petit",
      comments: [
        {
          author: {
            name: "Karim Benali",
            avatarUrl: "/avatars/karim.png"
          },
          content: "Article détaillé, j’ai appris plusieurs astuces sur Next.js.",
          date: "2024-05-29",
          highlighted: false,
        },
        {
          author: {
            name: "Emma Leroy",
            avatarUrl: "/avatars/emma.jpg"
          },
          content: "Enfin un guide Next.js accessible ! Merci Lucas.",
          date: "2024-05-30",
          highlighted: true,
        },
      ]
    },
    {
        id: 3,
        title: "Utiliser Next.js pour vos projets web modernes",
        description: "Apprenez à tirer parti de Next.js pour construire des applications web performantes et évolutives.",
        imageUrl: "/images/article.jpg",
        link: "/articles/utiliser-nextjs",
        date: "2024-05-28",
        author: "Lucas Petit",
        comments: [
          {
            author: {
              name: "Karim Benali",
              avatarUrl: "/avatars/karim.png"
            },
            content: "Article détaillé, j’ai appris plusieurs astuces sur Next.js.",
            date: "2024-05-29",
            highlighted: false,
          },
          {
            author: {
              name: "Emma Leroy",
              avatarUrl: "/avatars/emma.jpg"
            },
            content: "Enfin un guide Next.js accessible ! Merci Lucas.",
            date: "2024-05-30",
            highlighted: true,
          },
        ]
    },
    {
      id: 4,
      title: "Utiliser Next.js pour vos projets web modernes",
      description: "Apprenez à tirer parti de Next.js pour construire des applications web performantes et évolutives.",
      imageUrl: "/images/article.jpg",
      link: "/articles/utiliser-nextjs",
      date: "2024-05-28",
      author: "Lucas Petit",
      comments: [
        {
          author: {
            name: "Karim Benali",
            avatarUrl: "/avatars/karim.png"
          },
          content: "Article détaillé, j’ai appris plusieurs astuces sur Next.js.",
          date: "2024-05-29",
          highlighted: false,
        },
        {
          author: {
            name: "Emma Leroy",
            avatarUrl: "/avatars/emma.jpg"
          },
          content: "Enfin un guide Next.js accessible ! Merci Lucas.",
          date: "2024-05-30",
          highlighted: true,
        },
      ]
    },
    {
        id: 5,
        title: "Utiliser Next.js pour vos projets web modernes",
        description: "Apprenez à tirer parti de Next.js pour construire des applications web performantes et évolutives.",
        imageUrl: "/images/article.jpg",
        link: "/articles/utiliser-nextjs",
        date: "2024-05-28",
        author: "Lucas Petit",
        comments: [
          {
            author: {
              name: "Karim Benali",
              avatarUrl: "/avatars/karim.png"
            },
            content: "Article détaillé, j’ai appris plusieurs astuces sur Next.js.",
            date: "2024-05-29",
            highlighted: false,
          },
          {
            author: {
              name: "Emma Leroy",
              avatarUrl: "/avatars/emma.jpg"
            },
            content: "Enfin un guide Next.js accessible ! Merci Lucas.",
            date: "2024-05-30",
            highlighted: true,
          },
        ]
    }
  ];


  return (
    <div>
      <Header />
      <div
        className="fixed inset-0 -z-4 w-full h-full"
        style={{
          backgroundImage: "url('/images/background.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
      <div className="space-y-12 max-w-3xl mx-auto px-4 py-8">
        {articles.map((article) => (
          <div key={article.id} className="space-y-4">
            <ArticleCard
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              link={article.link}
              date={article.date}
              author={article.author}
            />
          </div>
        ))}
      </div>
    </div>

  );
}
