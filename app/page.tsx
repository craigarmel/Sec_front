"use client";

import { ArrowRight, Shield, Users, BookOpen, TrendingUp } from "lucide-react";
import BackgroundVideo from "@/components/ui/BackgroundVideo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: "Sécurité Avancée",
      description: "Protection de vos données avec les meilleures pratiques de sécurité",
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Rejoignez une communauté passionnée par la cybersécurité",
    },
    {
      icon: BookOpen,
      title: "Contenu de Qualité",
      description: "Articles et guides rédigés par des experts du domaine",
    },
    {
      icon: TrendingUp,
      title: "Toujours à Jour",
      description: "Restez informé des dernières tendances et actualités",
    },
  ];

  return (
    <div className="relative min-h-screen">
      <BackgroundVideo />
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center space-y-6 max-w-4xl">
          <Badge className="mb-4 px-4 py-1.5 text-sm font-semibold bg-indigo-600/20 text-indigo-300 border-indigo-500/50">
            Bienvenue sur SecureBlog
          </Badge>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Partageons ensemble l&apos;actualité du{" "}
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
              numérique
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Découvrez les dernières actualités, guides et analyses sur la cybersécurité 
            et le développement web sécurisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button size="lg" className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all">
              <Link href="/articles" className="flex items-center gap-2">
                Explorer les articles
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-12 px-8 text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/auth/register">
                Rejoindre la communauté
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-4 bg-gradient-to-b from-transparent via-white/5 to-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Pourquoi choisir SecureBlog ?
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Une plateforme moderne et sécurisée pour partager vos connaissances
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-indigo-300" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-white/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-md border-white/20">
            <CardHeader className="space-y-4">
              <CardTitle className="text-3xl md:text-4xl font-bold text-white">
                Prêt à commencer ?
              </CardTitle>
              <CardDescription className="text-lg text-white/90">
                Créez votre compte gratuitement et accédez à tous nos contenus exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="h-12 px-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                  <Link href="/auth/register" className="flex items-center gap-2">
                    Créer un compte
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-12 px-8 bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Link href="/articles">
                    Voir les articles
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
