// Captures Playwright à 390×844 (mobile) et 1440×900 (desktop).
// Usage : node outils/captures.mjs <url> <nom> [--reduit] [--temps=0,800,2500] [--scroll=#ancre] [--pleine]
import { createRequire } from 'node:module';
const { chromium } = createRequire(import.meta.url)('playwright');
import { mkdirSync } from 'node:fs';

const [url = 'http://localhost:4321/', nom = 'page', ...opts] = process.argv.slice(2);
const reduit = opts.includes('--reduit');
const pleine = opts.includes('--pleine');
const temps = (opts.find((o) => o.startsWith('--temps='))?.slice(8) ?? '2600').split(',').map(Number);
const ancre = opts.find((o) => o.startsWith('--scroll='))?.slice(9);
const dossier = 'captures';
mkdirSync(dossier, { recursive: true });

const formats = [
  { id: 'mobile', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
  { id: 'desktop', viewport: { width: 1440, height: 900 } },
];
const navigateur = await chromium.launch();
for (const f of formats) {
  const ctx = await navigateur.newContext({ ...f, deviceScaleFactor: 1, reducedMotion: reduit ? 'reduce' : 'no-preference' });
  const page = await ctx.newPage();
  const erreurs = [];
  page.on('pageerror', (e) => erreurs.push(e.message));
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()));
  await page.goto(url, { waitUntil: 'load' });
  if (ancre) {
    await page.evaluate((a) => {
      const el = document.querySelector(a);
      if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }, ancre);
  }
  let t0 = 0;
  for (const t of temps) {
    await page.waitForTimeout(t - t0);
    t0 = t;
    const fichier = `${dossier}/${nom}-${f.id}-${t}ms${reduit ? '-reduit' : ''}.png`;
    await page.screenshot({ path: fichier, fullPage: pleine });
    console.log(fichier);
  }
  if (erreurs.length) console.log('Erreurs', f.id, erreurs);
  await ctx.close();
}
await navigateur.close();
