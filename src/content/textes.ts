/**
 * TOUS LES TEXTES DU SITE.
 * Modifiez-les ici : la page se met à jour toute seule.
 * Les éléments entre crochets [à compléter] doivent être fournis
 * avant la mise en ligne (liste complète dans CONTENU_A_FOURNIR.md).
 */

export const contact = {
  telephoneAffiche: '01 54 88 88 81',
  telephoneInternational: '+2290154888881',
  whatsapp:
    'https://wa.me/2290154888881?text=Bonjour%20BIDOSS%20PARAISO%2C%20je%20souhaite%20un%20devis%20pour%20ma%20pr%C3%A9sence%20en%20ligne.',
  facebook: '[à compléter]',
  email: '[à compléter]',
  ville: '[à compléter]',
  zoneDesservie: '[à compléter]',
} as const;

export const seo = {
  titre: 'Création de logo et site web au Bénin | BIDOSS PARAISO',
  description:
    'Logo, site web, fiche Google et community manager au Bénin. BIDOSS PARAISO rend votre entreprise visible en ligne. Demandez un devis sur WhatsApp.',
  ogTitre: "Votre entreprise mérite d'être vue.",
  ogDescription:
    'Logo, site web, fiche Google et réseaux sociaux pour les entreprises au Bénin.',
  slogan: 'Votre paradis digital',
} as const;

export const menu = [
  { libelle: 'Services', ancre: '#services' },
  { libelle: 'Méthode', ancre: '#methode' },
  { libelle: 'Réalisations', ancre: '#realisations' },
  { libelle: 'Pourquoi nous', ancre: '#pourquoi' },
  { libelle: 'FAQ', ancre: '#faq' },
] as const;

export const hero = {
  titre: "Votre entreprise mérite d'être vue.",
  sousTitre: "Logo, site web, fiche Google, réseaux sociaux : on s'occupe de tout.",
  boutonPrincipal: 'Demander un devis sur WhatsApp',
  boutonSecondaire: 'Voir la méthode',
  passer: "Passer l'intro",
} as const;

export const constat = {
  titre: 'Vos clients vous cherchent en ligne. Vous trouvent-ils ?',
  texte:
    "Aujourd'hui, on cherche d'abord sur son téléphone. Sans logo clair, sans fiche Google, sans page active, votre entreprise passe inaperçue.",
  recherche: 'restaurant près de moi',
  resultatVide: 'Votre entreprise ici ?',
} as const;

export const services = {
  surtitre: 'Nos services',
  titre: 'Tout pour être visible, au même endroit.',
  liste: [
    {
      id: 'logo',
      titre: 'Logo et identité visuelle',
      benefice: "Une image claire, reconnue au premier coup d'œil.",
    },
    {
      id: 'site',
      titre: 'Site web',
      benefice: 'Votre vitrine ouverte jour et nuit, sur tous les téléphones.',
    },
    {
      id: 'google',
      titre: 'Fiche Google',
      benefice: 'Apparaissez quand on cherche votre activité près de chez vous.',
    },
    {
      id: 'reseaux',
      titre: 'Réseaux sociaux',
      benefice: 'Des publications régulières qui font revenir vos clients.',
    },
  ],
} as const;

export const demo = {
  surtitre: 'En action',
  titre: 'De zéro à visible.',
  texte: 'Un logo, un site, des publications. Votre marque prend vie.',
  marque: 'Votre marque',
  etapes: ['Le logo', 'Le site', 'Les publications'],
} as const;

export const methode = {
  surtitre: 'Notre méthode',
  titre: 'Quatre étapes, aucune surprise.',
  etapes: [
    {
      nom: 'Échange',
      texte: 'Vous nous parlez de votre activité sur WhatsApp ou en rendez-vous.',
    },
    { nom: 'Création', texte: 'Logo, site, fiche et visuels, à vos couleurs.' },
    { nom: 'Validation', texte: "Rien n'est publié sans votre accord." },
    { nom: 'Mise en ligne', texte: 'Votre entreprise devient visible, puis on suit vos réseaux.' },
  ],
} as const;

export const realisations = {
  surtitre: 'Réalisations',
  titre: 'Nos réalisations',
  casTitre: 'Notre propre cas : BIDOSS PARAISO',
  casTexte: 'Glissez le curseur pour comparer l’ancien et le nouveau logo.',
  avant: 'Avant',
  apres: 'Après',
  curseurLibelle: 'Comparer l’ancien et le nouveau logo',
  avantManquant: '[Ancien logo à fournir]',
  clients: [
    '[Réalisation client à fournir]',
    '[Réalisation client à fournir]',
    '[Réalisation client à fournir]',
  ],
} as const;

export const pourquoi = {
  surtitre: 'Pourquoi nous',
  titre: 'Une équipe sérieuse, et proche de vous.',
  valeurs: [
    { id: 'confiance', titre: 'Confiance', texte: 'Vous validez chaque étape. Pas de surprise.' },
    { id: 'proximite', titre: 'Proximité', texte: 'Une équipe au Bénin, joignable sur WhatsApp.' },
    { id: 'rapidite', titre: 'Rapidité', texte: 'Des réponses rapides, des délais tenus.' },
    { id: 'rigueur', titre: 'Rigueur', texte: 'Des fichiers propres, un travail soigné.' },
  ],
} as const;

export const faq = {
  surtitre: 'Questions fréquentes',
  titre: 'Vos questions, nos réponses.',
  questions: [
    { q: 'En combien de temps mon projet est-il prêt ?', r: '[à compléter]' },
    { q: 'Comment se passent les étapes ?', r: '[à compléter]' },
    { q: 'Quels documents dois-je fournir ?', r: '[à compléter]' },
    { q: 'Combien ça coûte ?', r: '[à compléter]' },
    { q: 'Est-ce que vous assurez le suivi ?', r: '[à compléter]' },
  ],
} as const;

export const ctaFinal = {
  titre: 'Prêt à être vu ?',
  texte: 'Écrivez-nous. On vous répond sur WhatsApp.',
  bouton: 'Demander un devis sur WhatsApp',
} as const;

export const footer = {
  mentions: 'Mentions légales',
  copyright: `© ${new Date().getFullYear()} BIDOSS PARAISO`,
  whatsappFlottant: 'Écrire sur WhatsApp',
} as const;
