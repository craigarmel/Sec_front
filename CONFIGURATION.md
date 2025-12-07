# Configuration de l'API

## Configuration de l'URL du backend

Le frontend communique avec le backend via la variable d'environnement `NEXT_PUBLIC_API_URL`.

### Fichier `.env`

Créez ou modifiez le fichier `.env` à la racine du projet :

```env
# Si votre backend est sur http://localhost:4000 et les routes commencent par /api
NEXT_PUBLIC_API_URL=http://localhost:4000/api

# Si votre backend est sur http://localhost:4000 et les routes commencent directement par /auth
NEXT_PUBLIC_API_URL=http://localhost:4000

# Si votre backend est sur un autre port (ex: 3001)
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Important

- **Avec `/api`** : Si votre backend a les routes sous `/api/auth/login`, utilisez `http://localhost:4000/api`
- **Sans `/api`** : Si votre backend a les routes directement sous `/auth/login`, utilisez `http://localhost:4000`

### Vérification

Après avoir configuré `.env`, redémarrez le serveur Next.js :

```bash
# Arrêtez le serveur (Ctrl+C)
npm run dev
```

Dans la console du navigateur (F12), vous devriez voir :
```
[API Client] Base URL: http://localhost:4000/api
```

### Content Security Policy (CSP)

La CSP a été configurée pour autoriser les connexions vers `localhost:*` en développement.

Si vous avez toujours des erreurs CSP :
1. Vérifiez que `NODE_ENV=development` dans votre `.env`
2. Redémarrez le serveur Next.js
3. Videz le cache du navigateur (Ctrl+Shift+R ou Cmd+Shift+R)
