# Codex — Bibliothèque de cours (statique)

React + TypeScript + Vite. Aucun backend, aucune base de données, aucun secret.

## Démarrer
    npm install
    npm run dev      # inclut le sélecteur Desktop / Tablette / Mobile (bas droite, dev uniquement)
    npm run build    # sortie statique dans dist/ (déployable sur GitHub Pages, Netlify, Cloudflare Pages)

## Ajouter une leçon (sans toucher au code)
1. Analysez le PDF avec un antivirus à jour, relisez-le (checklist dans SECURITY.md).
2. Copiez-le dans `public/lessons/`.
3. Ajoutez une entrée dans `public/lessons/lessons.json` :
   `{"id":"mon-cours","title":"…","description":"…","category":"controle-du-sucre","date":"2026-11-02","size":123456,"pages":4,"file":"lessons/mon-cours.pdf"}`
4. Supprimez les entrées `"sample": true` (PDF d'exemple générés par `npm run samples`) quand vous avez de vrais cours.

## Ajouter une catégorie
Ajoutez une entrée (slug, nom, description, icône Lucide) dans `src/data/categories.ts`.

## Déploiement sur GitHub Pages
Le site est déjà compatible : routage par `#/…` (pas de réécriture d'URL côté serveur) et chemins relatifs (`base: './'`), donc il fonctionne aussi bien sur `https://<user>.github.io/<depot>/` que sur un domaine personnalisé.

1. Créez un dépôt GitHub et poussez-y le contenu de ce dossier (branche `main`).
2. Dans le dépôt : **Settings → Pages → Build and deployment → Source : GitHub Actions**.
3. Chaque `git push` sur `main` lance `.github/workflows/deploy.yml` (installation, build, publication). L'adresse du site apparaît dans l'onglet **Actions**, puis dans Settings → Pages.

Ajouter une leçon = ajouter le PDF dans `public/lessons/`, une entrée dans `lessons.json`, puis `git push` : le site se met à jour tout seul.

## Autres hébergeurs
- Les en-têtes de sécurité sont dans `public/_headers` (Netlify / Cloudflare Pages). GitHub Pages ne permet pas d'en définir : la CSP en `<meta>` de `index.html` reste active, mais `frame-ancestors` et HSTS exigent un hébergeur compatible.
- QR Telegram : `public/qr-telegram.png` est l'image fournie, copiée sans modification.
