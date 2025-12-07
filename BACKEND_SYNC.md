# Synchronisation Frontend-Backend

## Endpoints Backend (NestJS)

Le backend NestJS écoute sur **port 4000** par défaut et n'utilise **PAS** de préfixe `/api`.

### Authentification (`/auth`)

- `POST /auth/register` - Inscription
  - Body: `{ name, email, password, consentGiven: boolean }`
  - Response: `{ message: string }`

- `POST /auth/login` - Connexion
  - Body: `{ email, password }`
  - Response: `{ message: string, user: User, access_token: string }`
  - Cookie: `access_token` (HttpOnly, Secure en production, SameSite=strict)

- `GET /auth/session` - Obtenir la session actuelle (nécessite JWT)
  - Response: `{ user: User, authenticated: boolean }`

- `GET /auth/me` - Obtenir l'utilisateur actuel (nécessite JWT)
  - Response: `User`

- `POST /auth/logout` - Déconnexion
  - Response: `{ message: string }`

### Configuration Frontend

Dans `.env` du frontend :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Important** : Pas de `/api` à la fin, car NestJS n'utilise pas ce préfixe.

### CORS

Le backend autorise automatiquement `localhost:*` en développement.

Pour la production, configurez `CORS_ORIGIN` dans le `.env` du backend.

### Cookies

Le backend utilise des cookies HttpOnly pour le JWT :
- Nom: `access_token`
- HttpOnly: true
- Secure: true (en production uniquement)
- SameSite: strict
- Path: /

Le frontend doit envoyer les cookies avec `credentials: 'include'` (déjà configuré).

### Format des données

**Inscription** :
- Frontend envoie: `{ name, email, password, consent }`
- Backend attend: `{ name, email, password, consentGiven: boolean }`
- Le mapping est fait automatiquement dans `authApi.register()`

**Connexion** :
- Frontend envoie: `{ email, password }`
- Backend retourne: `{ message, user, access_token }`

**Session** :
- Frontend appelle: `GET /auth/session`
- Backend retourne: `{ user, authenticated: true }` ou erreur 401 si non authentifié
