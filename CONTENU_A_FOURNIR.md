# Contenu à fournir avant la mise en ligne

Tout ce qui est entre crochets sur le site attend une information de votre part.
Rien n'a été inventé : ni tarif, ni délai, ni chiffre, ni témoignage, ni client.

## Où modifier
- **Textes de la page d'accueil** : `src/content/textes.ts`
- **Mentions légales** : `src/pages/mentions-legales.astro`
- **Images avant / après** : dossier `assets/avant-apres/`
- **Adresse du site** : `astro.config.mjs` (ligne `SITE`) ou variable `SITE_URL` chez l'hébergeur

## Liste

| # | Élément | Où il apparaît | Fichier |
|---|---|---|---|
| 1 | **Ancien logo** (`avant.png`) pour le curseur avant / après | Réalisations | `assets/avant-apres/avant.png` (déposez simplement le fichier) |
| 2 | **Prochaines réalisations** (capture dans `assets/realisations/` + accord du client) | Réalisations | `src/content/textes.ts` → `realisations.clients` |
| 3 | Relire les **réponses de la FAQ** rédigées (aucun tarif ni délai chiffré, renvoi vers WhatsApp) | FAQ | `src/content/textes.ts` → `faq` |
| 8 | **Lien de la page Facebook** | Pied de page | `src/content/textes.ts` → `contact.facebook` |
| 9 | **E-mail professionnel** | Mentions légales | `contact.email` |
| 10 | **Ville** affichée | Données Google (JSON-LD) | `contact.ville` |
| 11 | **Zone desservie** (ex. tout le Bénin, un département) | Données Google (JSON-LD) | `contact.zoneDesservie` |
| 12 | **Ville du siège** (quartier Arafat, dans quelle ville ?) | Mentions légales | `src/pages/mentions-legales.astro` |
| 15 | Phrase de **propriété intellectuelle** à valider | Mentions légales | idem |
| 16 | Phrase **données personnelles** à valider | Mentions légales | idem |
| 17 | **Nom de domaine** : pas pour l'instant, le site utilise l'adresse gratuite Cloudflare Pages (`bidoss-paraiso.pages.dev`). À changer le jour où un domaine est acheté | Liens de partage, sitemap | variable `SITE_URL` |
| 18 | **Photos réelles** (équipe, terrain, lumière naturelle) — emplacements à prévoir dans une prochaine version | — | — |

## Textes à confirmer
Votre consigne et le fichier `CONTENU_DU_SITE.md` du kit diffèrent légèrement. Le site suit votre consigne :

| Élément | Sur le site (votre consigne) | Version du kit |
|---|---|---|
| Sous-titre | « Logo, site web, fiche Google, réseaux sociaux : on s'occupe de tout. » | « … On s'occupe de tout, vous vous occupez de vos clients. » |
| Bouton principal | Demander un devis sur WhatsApp | Parler de mon projet sur WhatsApp |
| Bouton secondaire | Voir la méthode | Voir nos services |
| Message WhatsApp pré-rempli | « …je souhaite un devis pour ma présence en ligne. » | « …je veux rendre mon entreprise visible en ligne. » |
