# Synchronisation API Frontend-Backend

## Endpoints synchronisés

### ✅ Authentification (`/auth`)
- `POST /auth/register` - Inscription
- `POST /auth/login` - Connexion
- `GET /auth/session` - Session actuelle
- `GET /auth/me` - Utilisateur actuel
- `POST /auth/logout` - Déconnexion

### ✅ Articles/Posts (`/posts`)
- `GET /posts` - Liste de tous les articles
- `GET /posts/:id` - Détail d'un article (avec commentaires)
- `POST /posts` - Créer un article (authentifié)
- `PATCH /posts/:id` - Modifier un article (propriétaire ou admin)
- `DELETE /posts/:id` - Supprimer un article (propriétaire ou admin)

### ✅ Commentaires (`/posts/:postId/comments`)
- `POST /posts/:postId/comments` - Créer un commentaire (authentifié)
- `GET /posts/:postId/comments/:id` - Obtenir un commentaire
- `DELETE /posts/:postId/comments/:id` - Supprimer un commentaire (propriétaire ou admin)

**Note**: Les commentaires sont inclus dans la réponse `GET /posts/:id` via les relations TypeORM.

### ✅ Utilisateurs (`/users`)
- `GET /users` - Liste des utilisateurs (admin uniquement)
- `GET /users/:id` - Profil utilisateur (soi-même ou admin)
- `PATCH /users/:id` - Modifier un utilisateur (soi-même ou admin)

## Structure des données

### Post (Article)
```typescript
{
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  comments?: Comment[];
  createdAt: string;
  updatedAt: string;
}
```

### Comment
```typescript
{
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
  };
  postId: string;
  createdAt: string;
  updatedAt: string;
}
```

### User
```typescript
{
  id: string;
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  createdAt: string;
}
```

## Pages synchronisées

### ✅ `/articles` - Liste des articles
- Charge les articles depuis `GET /posts`
- Affiche les données réelles
- Gestion des états de chargement et d'erreur

### ✅ `/articles/[id]` - Détail d'un article
- Charge l'article depuis `GET /posts/:id`
- Affiche les commentaires inclus dans la réponse
- Permet de créer des commentaires via `POST /posts/:postId/comments`
- Vérifie l'authentification pour les commentaires

### ✅ `/admin/dashboard` - Dashboard admin
- Charge les statistiques réelles (utilisateurs, posts, commentaires)
- Affiche l'activité récente depuis l'API

### ✅ `/user/dashboard` - Dashboard utilisateur
- Charge les articles de l'utilisateur
- Affiche les commentaires de l'utilisateur
- Statistiques personnelles

## Protection IDOR

Tous les endpoints sensibles sont protégés côté backend :
- ✅ Modification/suppression de posts : vérifie que l'utilisateur est propriétaire ou admin
- ✅ Modification/suppression de commentaires : vérifie que l'utilisateur est propriétaire ou admin
- ✅ Accès aux profils utilisateurs : vérifie que l'utilisateur accède à son propre profil ou est admin

## Gestion des erreurs

- ✅ Timeout de 10 secondes pour éviter les chargements infinis
- ✅ Messages d'erreur clairs pour l'utilisateur
- ✅ Redirection vers login si non authentifié (401)
- ✅ Gestion des erreurs 404 (ressource non trouvée)
- ✅ États de chargement avec skeletons

## Configuration

Assurez-vous que votre `.env` contient :
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Le backend doit être démarré sur le port 4000 (ou ajustez l'URL).
