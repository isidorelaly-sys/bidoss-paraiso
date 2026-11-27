// Vérifie chaque paire texte / fond utilisée sur le site (WCAG 2.1).
// Lancer : npm run contrastes
const c = {
  petrole: '#075560', nuit: '#04343C', or: '#D9B24A', orPale: '#F0DC9C',
  ivoire: '#F8F5EC', ardoise: '#243238', vert: '#2E9E6B', corail: '#E0604A',
};
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
// [texte, fond, usage, seuil] — 4,5 texte courant ; 3 grands titres (≥ 24 px) et éléments d'interface
const paires = [
  ['ivoire', 'petrole', 'Texte courant sur bleu pétrole', 4.5],
  ['ivoire', 'nuit', 'Texte courant sur bleu nuit', 4.5],
  ['ardoise', 'ivoire', 'Texte courant sur ivoire', 4.5],
  ['petrole', 'ivoire', 'Titres et liens bleu pétrole sur ivoire', 4.5],
  ['nuit', 'or', 'Texte du bouton principal (nuit sur or)', 4.5],
  ['nuit', 'orPale', 'Bouton principal survolé', 4.5],
  ['or', 'petrole', 'Titres or ≥ 24 px sur pétrole', 3],
  ['or', 'nuit', 'Titres or ≥ 24 px sur nuit', 3],
  ['orPale', 'nuit', 'Texte or pâle sur nuit', 4.5],
  ['orPale', 'petrole', 'Texte or pâle sur pétrole', 4.5],
  ['ardoise', 'ivoire', 'Libellé de pastille', 4.5],
  ['vert', 'ivoire', 'Point vert de pastille (élément graphique)', 3],
  ['corail', 'ivoire', 'Point corail de pastille (élément graphique)', 3],
  ['petrole', 'ivoire', 'Contour de focus sur fond clair', 3],
  ['or', 'nuit', 'Contour de focus sur fond nuit', 3],
  ['or', 'petrole', 'Contour de focus sur fond pétrole', 3],
];
let echecs = 0;
console.log('Contraste  Seuil  Résultat  Usage');
for (const [t, f, usage, seuil] of paires) {
  const r = ratio(c[t], c[f]);
  const ok = r >= seuil;
  if (!ok) echecs++;
  console.log(`${r.toFixed(2).padStart(6)}:1  ${String(seuil).padEnd(4)}  ${ok ? 'OK    ' : 'ÉCHEC '}    ${usage}`);
}
// Interdits par la charte (vérifiés pour mémoire)
console.log(`\nInterdit : or sur ivoire = ${ratio(c.or, c.ivoire).toFixed(2)}:1 (jamais en texte).`);
if (echecs) { console.error(`\n${echecs} paire(s) en échec.`); process.exit(1); }
console.log('\nToutes les paires utilisées passent le niveau WCAG AA.');
