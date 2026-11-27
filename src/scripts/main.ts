/**
 * Point d'entrée JS (îlot client). Ce qui est essentiel est léger et immédiat ;
 * GSAP, ScrollTrigger et Lenis sont chargés ensuite, quand le navigateur est libre.
 */
import { demarrerReseau } from './reseau';
import { quandLibre, reduit } from './motion';

const racine = document.documentElement;

/* ---------- 1. Intro du hero : passable au clic, au scroll ou au clavier ---------- */
const hero = document.querySelector<HTMLElement>('[data-hero]');
if (hero) {
  let finie = false;
  const passer = (): void => {
    if (finie) return;
    finie = true;
    hero.classList.add('intro-passee');
    retirer();
  };
  const evenements: [EventTarget, string][] = [
    [hero, 'pointerdown'],
    [window, 'wheel'],
    [window, 'touchmove'],
    [window, 'keydown'],
  ];
  const retirer = (): void => evenements.forEach(([c, e]) => c.removeEventListener(e, passer));
  evenements.forEach(([c, e]) => c.addEventListener(e, passer, { passive: true, once: true }));
  hero.querySelector('[data-passer-intro]')?.addEventListener('click', passer);
  window.setTimeout(() => {
    finie = true;
    retirer();
  }, 2500);
}

/* ---------- 2. Fond réseau (canvas 2D) ---------- */
const canvas = document.querySelector<HTMLCanvasElement>('[data-reseau]');
if (canvas) requestAnimationFrame(() => demarrerReseau(canvas));

/* ---------- 3. En-tête et compteur de progression (un seul écouteur, rAF) ---------- */
const entete = document.querySelector<HTMLElement>('[data-entete]');
const progression = document.querySelector<HTMLElement>('[data-progression]');
const chiffre = document.querySelector<HTMLElement>('[data-progression-chiffre]');
let tic = false;
const surScroll = (): void => {
  if (tic) return;
  tic = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, y / max) : 0;
    entete?.classList.toggle('est-defile', y > 40);
    progression?.style.setProperty('--progression', p.toFixed(3));
    if (chiffre) chiffre.textContent = String(Math.round(p * 100));
    tic = false;
  });
};
window.addEventListener('scroll', surScroll, { passive: true });
surScroll();

// Ferme le menu mobile après un clic sur un lien
document.querySelectorAll<HTMLAnchorElement>('.menu-mobile a').forEach((a) =>
  a.addEventListener('click', () => a.closest('details')?.removeAttribute('open')),
);

/* ---------- 4. Services : le toucher révèle le bénéfice ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-service-bouton]').forEach((b) => {
  b.addEventListener('click', () => {
    const carte = b.closest('[data-service]');
    const actif = !carte?.classList.contains('est-actif');
    carte?.classList.toggle('est-actif', actif);
    b.setAttribute('aria-expanded', String(actif));
  });
});

/* ---------- 5. Avant / après : curseur natif (souris, tactile, clavier) ---------- */
document.querySelectorAll<HTMLElement>('[data-comparateur]').forEach((c) => {
  const curseur = c.querySelector<HTMLInputElement>('[data-comparateur-curseur]');
  if (!curseur) return;
  const maj = (): void => {
    c.style.setProperty('--position', `${curseur.value}%`);
    curseur.setAttribute('aria-valuetext', `${curseur.value} % de l'ancien logo visible`);
  };
  curseur.addEventListener('input', maj);
  maj();
});

/* ---------- 6. Mouvement riche, chargé à la demande ---------- */
if (reduit()) {
  racine.classList.add('mouvement-reduit');
  document.querySelectorAll('[data-methode]').forEach((m) => m.classList.add('est-statique'));
} else {
  quandLibre(() => {
    import('./animations')
      .then((m) => m.initialiser())
      .catch(() => {
        document.querySelectorAll('[data-methode]').forEach((m) => m.classList.add('est-statique'));
      });
  });
}
