# Le carnet disparu : jeu de piste Art nouveau à Nancy

Jeu de piste sur téléphone : carte, géolocalisation, 22 étapes, questions, indices payants, classement en direct et espace enseignant.

- `public/index.html` : le jeu des étudiants
- `public/admin.html` : l'espace enseignant (classement, réponses, notes, bonus, carte, export CSV)
- `src/etapes.js` : **le contenu du jeu** (textes, questions, réponses, coordonnées), à modifier ici
- `src/worker.js` : l'API (Cloudflare Worker)
- `schema.sql` : la base de données (Cloudflare D1)

Les bonnes réponses restent sur le serveur : elles ne sont pas visibles dans le code de la page.

---

## Option A (recommandée) : tout sur Cloudflare Workers, gratuit

Prérequis : un compte Cloudflare gratuit et Node.js installé.

```bash
npm install
npx wrangler login

# 1. Créer la base, puis copier le "database_id" affiché dans wrangler.toml
npx wrangler d1 create carnet-disparu

# 2. Créer les tables
npm run db:remote

# 3. Choisir la clé de l'espace enseignant (elle vous est demandée)
npx wrangler secret put ADMIN_KEY

# 4. Publier
npm run deploy
```

Wrangler affiche l'adresse du jeu, du type `https://carnet-disparu.<compte>.workers.dev`.

- Lien à donner aux étudiants : `https://carnet-disparu.<compte>.workers.dev/?partie=bachelor-2026`
- Espace enseignant : `https://carnet-disparu.<compte>.workers.dev/admin`, avec la clé et le même nom de partie.

Le paramètre `partie` sépare les groupes : une classe, une sortie, une partie. Sans paramètre, la partie s'appelle `nancy`.

Astuce : transformez le lien en QR code et imprimez-le sur la brochure.

### Tester sur son ordinateur

```bash
echo "ADMIN_KEY=test" > .dev.vars
npm run db:local
npm run dev        # puis ouvrir http://localhost:8787
```

## Option B : la page sur GitHub Pages, l'API sur Cloudflare

1. Faites l'option A (l'API doit exister).
2. Dans `public/config.js`, indiquez l'adresse du Worker :
   `window.CARNET_API = "https://carnet-disparu.<compte>.workers.dev";`
3. Publiez le contenu du dossier `public/` sur GitHub Pages (Settings, Pages, branche `main`, dossier `/public` ou racine).

GitHub Pages ne peut pas enregistrer de réponses seul : il faut toujours une API à côté.

## Option C : déploiement automatique depuis GitHub (sans rien installer)

1. Créez un dépôt GitHub vide (privé possible), par exemple `carnet-disparu`, puis déposez-y le contenu de ce dossier (bouton « uploading an existing file », y compris le dossier `.github`).
2. Sur Cloudflare, créez un jeton d'API : My Profile, API Tokens, Create Token, modèle « Edit Cloudflare Workers », puis ajoutez la permission Account, D1, Edit.
3. Relevez votre Account ID (page d'accueil du tableau de bord Cloudflare, colonne de droite).
4. Dans le dépôt GitHub : Settings, Secrets and variables, Actions, et ajoutez trois secrets :
   - `CLOUDFLARE_API_TOKEN` : le jeton
   - `CLOUDFLARE_ACCOUNT_ID` : l'Account ID
   - `ADMIN_KEY` : la clé de l'espace enseignant, au choix
5. Onglet Actions, « Déployer sur Cloudflare », Run workflow. L'adresse du jeu apparaît dans le journal de l'étape « Publier le jeu ».

Chaque modification poussée sur `main` redéploie le jeu.

---

## Fonctionnement du jeu

- Une étape se débloque à moins de 50 m (réglable dans `src/etapes.js`, `rayon`). Si le GPS se trompe, l'équipe peut la débloquer à la main : c'est signalé « sans GPS » dans l'espace enseignant.
- Bonne réponse : 10 points, une seule tentative. Indice : moins 3. Solution : moins 6.
- Les questions à réponse libre (étapes 10 et 13) sont notées par l'enseignant dans l'espace enseignant.
- Bonus et pénalités (photo de ginkgo, retard, etc.) s'ajoutent à la main.
- La position n'est envoyée qu'au moment de valider une réponse : pas de suivi continu des étudiants.
- Si un téléphone se ferme, l'équipe reprend sa partie au même endroit, sur le même téléphone.

## Modifier le contenu

Tout est dans `src/etapes.js`. Types de questions :

- `qcm` : `choix` (liste), `reponse` = numéro du bon choix, en partant de 0
- `nombre` : `reponse` = valeur, `tolerance` = écart accepté
- `texte` : réponse libre, notée par l'enseignant

Après modification : `npm run deploy`.

## Remettre une partie à zéro

```bash
npx wrangler d1 execute carnet-disparu --remote --command "DELETE FROM reponses WHERE partie='nancy'; DELETE FROM aides WHERE equipe_id IN (SELECT id FROM equipes WHERE partie='nancy'); DELETE FROM bonus WHERE partie='nancy'; DELETE FROM equipes WHERE partie='nancy';"
```

## Crédits

Contenus et photos des étapes 1 à 8 d'après le parcours Baludik « Nancy, capitale de l'Art nouveau » (Métropole du Grand Nancy) : vérifier les conditions de réutilisation avant diffusion. Fond de carte © contributeurs OpenStreetMap, bibliothèque Leaflet.
