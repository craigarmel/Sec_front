"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Shield, FileText, Lock, Eye, Trash2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Confidentialite() {
  const sections = [
    {
      icon: Shield,
      title: "1. Collecte des informations",
      content: "Nous collectons uniquement les données strictement nécessaires à la gestion de notre site, telles que :",
      items: [
        "Votre nom et adresse e-mail lors de l'inscription ou du contact",
        "Vos commentaires et retours sur notre contenu",
        "Des données de navigation anonymisées pour améliorer l'expérience utilisateur",
      ],
    },
    {
      icon: FileText,
      title: "2. Utilisation des informations",
      content: "Les informations collectées sont utilisées uniquement pour :",
      items: [
        "Vous proposer du contenu pertinent",
        "Gérer vos demandes et répondre à vos questions",
        "Améliorer notre site et nos services",
      ],
    },
    {
      icon: Lock,
      title: "3. Partage des données",
      content: "Vos données personnelles ne sont jamais vendues ni partagées avec des tiers, sauf dans les cas prévus par la loi ou avec votre consentement explicite.",
    },
    {
      icon: Shield,
      title: "4. Sécurité",
      content: "Nous mettons en œuvre des mesures de sécurité adaptées pour protéger vos données personnelles contre tout accès non autorisé, altération ou destruction.",
    },
    {
      icon: Eye,
      title: "5. Durée de conservation",
      content: "Nous conservons vos données uniquement le temps nécessaire à la réalisation des finalités décrites ci-dessus et conformément à la législation en vigueur.",
    },
    {
      icon: Trash2,
      title: "6. Vos droits",
      content: "Vous pouvez à tout moment accéder à vos données, demander leur rectification ou leur suppression, ou exercer votre droit d'opposition.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-6">
            <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Chez SecureBlog, nous nous engageons à protéger la confidentialité de vos informations personnelles.
          </p>
          <Badge className="mt-4" variant="secondary">
            Dernière mise à jour : Juin 2024
          </Badge>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex-shrink-0">
                    <section.icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl mb-2">{section.title}</CardTitle>
                    <CardDescription className="text-base">
                      {section.content}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              {section.items && (
                <CardContent className="pl-20">
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <span className="text-indigo-600 dark:text-indigo-400 mt-1">•</span>
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}

          {/* Contact Section */}
          <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                  <Mail className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle>Contact</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Pour toute demande concernant vos données personnelles, contactez-nous à l&apos;adresse suivante :
              </p>
              <a
                href="mailto:contact@secureblog.fr"
                className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium inline-flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                contact@secureblog.fr
              </a>
            </CardContent>
          </Card>

          {/* Modifications Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle>7. Modifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Nous pouvons modifier cette politique de confidentialité à tout moment. 
                Toute modification sera publiée sur cette page avec la date de mise à jour.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
