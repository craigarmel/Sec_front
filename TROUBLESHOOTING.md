# Guide de dépannage - Problèmes de connexion

## Problème : Chargement infini lors de la connexion

### Solutions possibles :

#### 1. Vérifier que le backend est démarré
Assurez-vous que votre serveur backend (sec_back) est bien démarré et accessible.

```bash
# Vérifiez que le backend écoute sur le bon port
# Par défaut, le frontend cherche l'API sur http://localhost:3001/api
```

#### 2. Vérifier l'URL de l'API
Le frontend utilise la variable d'environnement `NEXT_PUBLIC_API_URL`.

**Créer/modifier le fichier `.env` à la racine du projet :**

```env
# Si votre backend est sur le port 3001 avec le chemin /api
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Si votre backend est sur le port 3000 (même serveur)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Si votre backend est sur un autre port
NEXT_PUBLIC_API_URL=http://localhost:PORT/api
```

#### 3. Redémarrer le serveur de développement
Après avoir modifié `.env`, redémarrez le serveur Next.js :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez-le
npm run dev
```

#### 4. Vérifier la console du navigateur
Ouvrez les outils de développement (F12) et regardez :
- L'onglet **Console** pour les erreurs JavaScript
- L'onglet **Network** pour voir les requêtes HTTP

Vous devriez voir :
- `[API Client] Base URL: http://localhost:XXXX/api` dans la console
- Les requêtes vers `/auth/login` dans l'onglet Network

#### 5. Vérifier CORS
Si vous voyez des erreurs CORS dans la console, votre backend doit autoriser les requêtes depuis `http://localhost:3000`.

#### 6. Timeout
Le frontend a maintenant un timeout de 10 secondes. Si la connexion prend plus de temps, vous verrez un message d'erreur explicite.

### Messages d'erreur courants :

- **"Impossible de contacter le serveur"** → Le backend n'est pas démarré ou l'URL est incorrecte
- **"La requête a pris trop de temps"** → Le backend ne répond pas (vérifiez qu'il est démarré)
- **"Erreur réseau"** → Problème de connexion ou CORS

### Test rapide :

Testez si votre API est accessible :

```bash
# Dans un terminal
curl http://localhost:3001/api/auth/session
# ou
curl http://localhost:3000/api/auth/session
```

Si vous obtenez une réponse (même une erreur), l'API est accessible. Si vous obtenez "Connection refused", le backend n'est pas démarré.
