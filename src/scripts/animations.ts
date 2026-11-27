/**
 * Mouvement riche (chargé après l'affichage) : GSAP + ScrollTrigger + Lenis.
 * Fil conducteur « le réseau de confiance » : des points isolés se connectent.
 * Courbes : expo.out / power3.out en entrée, power2.inOut en transition.
 * Seuls transform, opacity (et stroke-dashoffset des SVG) sont animés.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { DUREE, EASE, STAGGER, estMobile, pointeurFin } from './motion';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const tous = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T[] =>
  Array.from(ctx.querySelectorAll<T>(sel));

/* Polygone hexagonal (pointe en haut) centré, de taille relative t (0 → 1,6 couvre la boîte). */
const hex = (t: number): string => {
  const p = (x: number, y: number) => `${50 + x * t}% ${50 + y * t}%`;
  return `polygon(${p(0, -50)}, ${p(50, -25)}, ${p(50, 25)}, ${p(0, 50)}, ${p(-50, 25)}, ${p(-50, -25)})`;
};

function scrollFluide(): void {
  if (!pointeurFin()) return; // tactile : défilement natif, plus fiable sur Android modeste
  const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -72 } });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

function revelations(): void {
  // Titres de section : montée + fondu, enfants décalés
  tous('[data-revele]').forEach((bloc) => {
    gsap.from(bloc.children, {
      y: 32,
      opacity: 0,
      duration: DUREE.moyenne,
      ease: EASE.entree,
      stagger: STAGGER.normal,
      scrollTrigger: { trigger: bloc, start: 'top 82%', once: true },
    });
  });
  // Masques géométriques en hexagone
  tous('[data-hex-revele]').forEach((el) => {
    gsap.fromTo(
      el,
      { clipPath: hex(0.08) },
      {
        clipPath: hex(1.6),
        duration: DUREE.longue,
        ease: EASE.transition,
        delay: Number(getComputedStyle(el).getPropertyValue('--i') || 0) * STAGGER.large,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        clearProps: 'clipPath',
      },
    );
  });
}

function constat(): void {
  const zone = document.querySelector('[data-recherche]');
  const saisie = zone?.querySelector<HTMLElement>('[data-saisie]');
  if (!zone || !saisie) return;
  const texte = saisie.dataset.texte ?? '';
  const etat = { n: 0 };
  saisie.textContent = '';
  const resultats = tous('[data-resultat]', zone);
  gsap.set(resultats, { y: 24, opacity: 0 });
  const tl = gsap.timeline({ scrollTrigger: { trigger: zone, start: 'top 75%', once: true } });
  tl.to(etat, {
    n: texte.length,
    duration: texte.length / 18,
    ease: 'none',
    onUpdate: () => {
      saisie.textContent = texte.slice(0, Math.round(etat.n));
    },
  }).to(resultats, { y: 0, opacity: 1, duration: DUREE.moyenne, ease: EASE.entree, stagger: STAGGER.large }, '+=0.15');
}

function services(): void {
  const cartes = tous('[data-service]');
  if (!cartes.length) return;
  const tl = gsap.timeline({
    scrollTrigger: { trigger: '[data-services]', start: 'top 78%', once: true },
  });
  cartes.forEach((c, i) => {
    const t = i * 0.1;
    tl.from(c.querySelector('.service__fond'), { scale: 0.4, opacity: 0, transformOrigin: '50% 50%', duration: 0.9, ease: EASE.entree }, t)
      .fromTo(c.querySelector('.service__contour'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1, ease: EASE.transition }, t + 0.1)
      .fromTo(tous('.service__icone *', c), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: EASE.entreeDouce }, t + 0.35)
      .from(c.querySelector('.service__titre'), { y: 14, opacity: 0, duration: 0.6, ease: EASE.entreeDouce }, t + 0.45);
  });
}

function demo(): void {
  const section = document.querySelector<HTMLElement>('[data-demo]');
  if (!section) return;
  const q = <T extends Element = HTMLElement>(s: string) => section.querySelector<T>(s);
  const etapes = tous('[data-demo-etape]', section);
  const logo = q('[data-ecran="logo"]');
  const site = q('[data-ecran="site"]');
  const pubs = tous('[data-publication]', section);

  gsap.set(logo, { opacity: 1 });
  gsap.set(tous('.mf-cercle, .mf-feuille', section), { strokeDashoffset: 1 });
  gsap.set(q('[data-mf-nom]'), { opacity: 0, y: 12 });
  gsap.set(site, { opacity: 0, y: 24 });
  gsap.set(site ? Array.from(site.children) : [], { opacity: 0, y: 16 });
  gsap.set(pubs, { yPercent: 140, opacity: 0 });

  const allumer = (i: number) => etapes.forEach((e, k) => e.classList.toggle('est-actif', k === i));
  allumer(0);

  const tl = gsap.timeline({
    defaults: { ease: EASE.transition },
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * 1.6}`,
      pin: q('[data-demo-epingle]'),
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (st) => allumer(st.progress < 0.36 ? 0 : st.progress < 0.68 ? 1 : 2),
    },
  });
  tl.to('.mf-cercle', { strokeDashoffset: 0, duration: 1 })
    .to('.mf-feuille', { strokeDashoffset: 0, duration: 0.8 }, '-=0.3')
    .to(q('[data-mf-nom]'), { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
    .to(logo, { opacity: 0, scale: 0.85, duration: 0.5 }, '+=0.4')
    .to(site, { opacity: 1, y: 0, duration: 0.5 }, '<0.1')
    .to(site ? Array.from(site.children) : [], { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, '<')
    .to(pubs, { yPercent: 0, opacity: 1, duration: 0.7, stagger: 0.3 }, '+=0.4')
    .to({}, { duration: 0.3 });
}

function methode(): void {
  const section = document.querySelector<HTMLElement>('[data-methode]');
  if (!section) return;
  const ligne = section.querySelector<HTMLElement>('[data-ligne]');
  const rail = section.querySelector<HTMLElement>('.etapes__rail');
  const etapes = tous('[data-etape]', section);
  const vertical = (): boolean => window.matchMedia('(max-width: 959px)').matches;

  // Mobile : le rail s'arrête au centre du dernier nœud
  const ajusterRail = (): void => {
    const der = etapes[etapes.length - 1];
    if (!rail || !der) return;
    rail.style.bottom = vertical() ? `${der.offsetHeight - 26}px` : '';
  };
  ajusterRail();
  window.addEventListener('resize', ajusterRail, { passive: true });

  const allumer = (p: number): void =>
    etapes.forEach((e, i) => e.classList.toggle('est-allumee', p >= i / (etapes.length - 1) - 0.001));

  const mm = gsap.matchMedia();
  mm.add({ v: '(max-width: 959px)', h: '(min-width: 960px)' }, (ctx) => {
    const axe = ctx.conditions?.['v'] ? 'scaleY' : 'scaleX';
    gsap.set(ligne, { [axe]: 0 });
    gsap.to(ligne, {
      [axe]: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${window.innerHeight * 1.2}`,
        pin: section.querySelector('[data-methode-epingle]'),
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (st) => allumer(st.progress),
      },
    });
  });
  allumer(0);
}

function pourquoi(): void {
  const valeurs = tous('[data-valeur]');
  if (!valeurs.length) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-valeurs]', start: 'top 80%', once: true } });
  tl.from(valeurs, { y: 28, opacity: 0, duration: DUREE.moyenne, ease: EASE.entreeDouce, stagger: STAGGER.normal })
    .fromTo(tous('.valeur__icone *'), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: EASE.entreeDouce, stagger: 0.04 }, 0.15);
}

function ctaFinal(): void {
  const cta = document.querySelector<HTMLElement>('[data-cta]');
  if (!cta) return;
  const tl = gsap.timeline({ scrollTrigger: { trigger: cta, start: 'top 70%', once: true } });
  tl.from(tous('.cta__noeuds circle', cta), { scale: 0, transformOrigin: '50% 50%', duration: 0.6, ease: EASE.entree, stagger: 0.05 })
    .fromTo(tous('.cta__liens path', cta), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: EASE.transition }, 0.2)
    .from(tous('.cta__contenu > *', cta), { y: 28, opacity: 0, duration: DUREE.moyenne, ease: EASE.entree, stagger: STAGGER.normal }, 0.6);
}

function microInteractions(): void {
  if (!pointeurFin()) return;
  // Boutons magnétiques
  tous('[data-magnetique]').forEach((b) => {
    const x = gsap.quickTo(b, 'x', { duration: 0.4, ease: EASE.entreeDouce });
    const y = gsap.quickTo(b, 'y', { duration: 0.4, ease: EASE.entreeDouce });
    b.addEventListener('pointermove', (e) => {
      const r = b.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.25);
      y((e.clientY - r.top - r.height / 2) * 0.35);
    });
    b.addEventListener('pointerleave', () => {
      x(0);
      y(0);
    });
  });
  // Curseur personnalisé discret
  const curseur = document.querySelector<HTMLElement>('[data-curseur]');
  if (!curseur) return;
  document.documentElement.classList.add('curseur-actif');
  const cx = gsap.quickTo(curseur, 'x', { duration: 0.35, ease: EASE.entreeDouce });
  const cy = gsap.quickTo(curseur, 'y', { duration: 0.35, ease: EASE.entreeDouce });
  window.addEventListener('pointermove', (e) => {
    cx(e.clientX);
    cy(e.clientY);
    curseur.classList.add('est-visible');
  }, { passive: true });
  document.addEventListener('pointerleave', () => curseur.classList.remove('est-visible'));
  document.addEventListener('pointerover', (e) => {
    const cible = (e.target as Element).closest('a, button, summary, input');
    curseur.classList.toggle('est-sur-lien', !!cible);
  });
}

export function initialiser(): void {
  scrollFluide();
  revelations();
  constat();
  services();
  demo();
  methode();
  pourquoi();
  ctaFinal();
  microInteractions();
  if (!estMobile()) ScrollTrigger.refresh();
}
