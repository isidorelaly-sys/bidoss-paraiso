// Parcourt la page et capture chaque section (mobile 390×844 et desktop 1440×900).
// Usage : node outils/parcours.mjs [url] [--reduit] [--format=mobile|desktop]
import { createRequire } from 'node:module';
import { mkdirSync } from 'node:fs';
const { chromium } = createRequire(import.meta.url)('playwright');

const args = process.argv.slice(2);
const url = args.find((a) => a.startsWith('http')) ?? 'http://localhost:4321/';
const reduit = args.includes('--reduit');
const seul = args.find((a) => a.startsWith('--format='))?.slice(9);
mkdirSync('captures', { recursive: true });

const etapes = [
  ['constat', '.constat', 0, 1800],
  ['services', '#services', 0, 2200],
  ['demo-1', '[data-demo]', 0.05, 900],
  ['demo-2', '[data-demo]', 0.75, 900],
  ['demo-3', '[data-demo]', 1.45, 900],
  ['methode-1', '#methode', 0.05, 900],
  ['methode-2', '#methode', 0.6, 900],
  ['methode-3', '#methode', 1.25, 900],
  ['realisations', '#realisations', 0, 1800],
  ['pourquoi', '#pourquoi', 0, 1800],
  ['faq', '#faq', 0, 900],
  ['cta', '.cta', 0, 2000],
  ['pied', 'footer', 0, 600],
];
const formats = [
  { id: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { id: 'desktop', viewport: { width: 1440, height: 900 } },
].filter((f) => !seul || f.id === seul);

const nav = await chromium.launch();
for (const f of formats) {
  const ctx = await nav.newContext({ ...f, deviceScaleFactor: 1, reducedMotion: reduit ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()));
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForTimeout(2800);
  for (const [nom, sel, decalage, attente] of etapes) {
    // Défilement progressif (déclenche ScrollTrigger comme un vrai visiteur)
    const cible = await page.evaluate(([s, d]) => {
      const el = document.querySelector(s);
      if (!el) return null;
      return el.getBoundingClientRect().top + window.scrollY + d * window.innerHeight;
    }, [sel, decalage]);
    if (cible == null) { console.log('absent', sel); continue; }
    for (let i = 0; i < 12; i++) {
      const y = await page.evaluate(() => window.scrollY);
      const pas = (cible - y) / (12 - i);
      await page.mouse.wheel(0, pas);
      await page.waitForTimeout(60);
    }
    await page.evaluate((c) => window.scrollTo(0, c), cible);
    await page.waitForTimeout(attente);
    const fichier = `captures/p-${f.id}-${nom}${reduit ? '-reduit' : ''}.png`;
    await page.screenshot({ path: fichier });
  }
  console.log(f.id, erreurs.length ? erreurs : 'aucune erreur JS');
  await ctx.close();
}
await nav.close();
