# Sécurité

## Principes
- Site 100 % statique : pas de serveur, pas d'envoi de fichiers, pas de secrets.
- Un PDF soumis n'est **jamais** publié automatiquement : il reste local chez le contributeur, puis passe par le groupe Telegram et une validation manuelle.
- Le contenu des PDF n'est jamais injecté dans le DOM ; l'aperçu utilise le lecteur natif du navigateur dans une `<iframe>` (PDF locaux : URL `blob:`). Tout texte saisi est rendu par React (échappement automatique) et nettoyé (`clean`, `safeName`). Pas d'`eval`, pas de `dangerouslySetInnerHTML`, aucune ressource tierce.
- CSP restrictive (meta + `public/_headers`), dépendances épinglées (`package.json` + `package-lock.json`).

## Contrôles dans le navigateur (`src/lib/pdf.ts`)
Extension, type MIME, taille max 15 Mo, signature `%PDF-`, présence de `%%EOF`, détection d'éléments actifs (`/JavaScript`, `/Launch`, `/OpenAction`, `/EmbeddedFile`…). **Ce n'est pas un antivirus** : un fichier piégé peut passer ces tests. Le filtre NSFW sur titre/description est un simple signal, pas un filtre de contenu.

## Compromis de l'aperçu
Le lecteur natif est isolé du site mais n'est pas un bac à sable : une faille du lecteur du navigateur resterait exploitable. Pour les cours publics, vous maîtrisez les fichiers ; pour les fichiers soumis, l'aperçu local ne concerne que le contributeur lui-même. En cas de doute, téléchargez sans ouvrir.

## Responsabilités de l'administrateur
Checklist avant publication :
1. Scanner le PDF (antivirus à jour, ou VirusTotal pour un fichier non confidentiel).
2. Ouvrir dans un lecteur à jour, de préférence sur une machine/VM isolée ; refuser tout PDF avec scripts, pièces jointes ou formulaires inattendus.
3. Relire toutes les pages : contenu pédagogique, pas de contenu sexuel/violent/illicite, pas de données personnelles, droits d'auteur respectés.
4. Renommer le fichier, vérifier la taille réelle, puis l'ajouter à `lessons.json`.
5. Prévoir (optionnel) un scan automatique en CI (ex. ClamAV dans GitHub Actions) avant déploiement : c'est l'emplacement prévu pour un futur workflow de scan externe.
