# BIDOSS PARAISO — site vitrine

« Votre paradis digital ». Site d'une page qui présente l'offre de présence en ligne
(logo, site web, fiche Google, réseaux sociaux) et amène chaque visiteur sur WhatsApp.

- **Astro** (site 100 % statique) + TypeScript strict
- **Tailwind CSS** branché sur les couleurs de la charte
- **GSAP + ScrollTrigger** et **Lenis**, chargés après l'affichage, seulement côté navigateur
- Aucun framework d'interface, aucun WebGL

## Installer et lancer

Il faut [Node.js](https://nodejs.org) 22 ou plus.

```bash
npm install        # une seule fois
npm run dev        # site de travail sur http://localhost:4321
npm run build      # vérifie le code puis fabrique le site dans dist/
npm run preview    # affiche le site fabriqué
npm run contrastes # contrôle les contrastes de couleurs (WCAG AA)
```

Captures d'écran (le site doit tourner avec `npm run preview`) :

```bash
node outils/captures.mjs http://localhost:4321/ hero --temps=300,1200,2600   # moments de l'intro
node outils/parcours.mjs                                                       # toutes les sections
node outils/parcours.mjs --reduit                                              # mouvement réduit
```

## Modifier le contenu

| Je veux changer… | Fichier |
|---|---|
| Un texte de la page d'accueil, le numéro, le lien WhatsApp | `src/content/textes.ts` |
| Les mentions légales | `src/pages/mentions-legales.astro` |
| L'image « avant » ou « après » | `assets/avant-apres/avant.png` et `apres.png` (même nom, le site s'adapte) |
| Le titre Google, la description | `src/content/textes.ts` → `seo` |
| Une couleur | `src/styles/global.css` (bloc `:root`) — à ne pas faire sans mettre à jour la charte |

Le logo vient **uniquement** des fichiers officiels de `assets/logo/`. Le composant
`src/components/ui/Logo.astro` les insère sans modifier aucun tracé : il retire
seulement les métadonnées et nomme les calques pour l'animation.

La liste de ce qui reste à fournir est dans [`CONTENU_A_FOURNIR.md`](CONTENU_A_FOURNIR.md).

## Mettre en ligne

### Cloudflare Pages (recommandé, gratuit)
1. Cloudflare → Workers & Pages → Créer → Pages → Connecter à Git → choisir ce dépôt.
2. Préréglage : **Astro**. Commande : `npm run build`. Dossier : `dist`.
3. Variable d'environnement : `SITE_URL` = l'adresse définitive (ex. `https://bidossparaiso.com`).
4. Le fichier `public/_headers` règle la sécurité et le cache automatiquement.

### Netlify
Importer le dépôt : `netlify.toml` contient déjà la configuration. Ajouter `SITE_URL`.

### Vercel
Importer le dépôt : `vercel.json` contient déjà la configuration. Ajouter `SITE_URL`.

## Organisation

```
assets/logo/            logos officiels (SVG du kit, jamais modifiés)
assets/avant-apres/     images du curseur avant / après
public/                 polices woff2, favicon, icônes, manifest, image de partage
src/content/textes.ts   tous les textes
src/components/ui/      Logo, Bouton, Icone, Pastille, Hexagone
src/components/sections/ une section = un fichier
src/scripts/main.ts     JS essentiel (intro, en-tête, curseur avant/après…)
src/scripts/reseau.ts   fond « réseau vivant » (canvas 2D)
src/scripts/animations.ts mouvement au scroll (GSAP), chargé ensuite
outils/                 contrastes, captures, parcours
docs/                   rapport final et captures
```

## Mouvement et accessibilité
- L'intro du hero est en CSS : elle démarre à la première image, sans attendre le JS,
  et se passe au clic, au scroll ou au clavier.
- Si le téléphone demande moins d'animations, tout s'affiche tout de suite (fondus de 150 ms),
  le réseau reste fixe et Lenis est désactivé.
- Sans JavaScript, toute la page reste lisible et les liens WhatsApp fonctionnent.
