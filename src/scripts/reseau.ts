/**
 * Fond « réseau vivant » : nœuds et liaisons dorés sur canvas 2D.
 * 60 nœuds max sur mobile, 120 sur desktop. Réagit au pointeur ou à
 * l'inclinaison, se densifie au défilement, se met en pause hors écran
 * et onglet caché. Statique si l'utilisateur préfère moins d'animations.
 */
import { estMobile, reduit } from './motion';

interface Noeud { x: number; y: number; vx: number; vy: number; r: number; }

const OR = '217,178,74';

export function demarrerReseau(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const maxNoeuds = estMobile() ? 60 : 120;
  const statique = reduit();
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  let l = 0;
  let h = 0;
  let noeuds: Noeud[] = [];
  let densite = 0; // 0 → 1 selon le défilement
  let visible = true;
  let enCours = false;
  let raf = 0;
  const cible = { x: 0, y: 0 }; // décalage pointeur / inclinaison (-1 → 1)
  const decalage = { x: 0, y: 0 };

  const creer = (): void => {
    noeuds = Array.from({ length: maxNoeuds }, () => ({
      x: Math.random() * l,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: 1.2 + Math.random() * 1.6,
    }));
  };

  const redimensionner = (): void => {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === l && rect.height === h) return;
    l = rect.width;
    h = rect.height;
    canvas.width = Math.round(l * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    creer();
  };

  const dessiner = (): void => {
    ctx.clearRect(0, 0, l, h);
    const actifs = Math.round(maxNoeuds * (0.45 + 0.55 * densite));
    const portee = (estMobile() ? 95 : 130) * (1 + 0.35 * densite);
    const portee2 = portee * portee;
    decalage.x += (cible.x - decalage.x) * 0.05;
    decalage.y += (cible.y - decalage.y) * 0.05;

    for (let i = 0; i < actifs; i++) {
      const n = noeuds[i]!;
      if (!statique) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -20) n.x = l + 20; else if (n.x > l + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20; else if (n.y > h + 20) n.y = -20;
      }
    }
    // Parallaxe douce : les nœuds proches bougent plus (profondeur ∝ rayon)
    ctx.lineWidth = 1;
    for (let i = 0; i < actifs; i++) {
      const a = noeuds[i]!;
      const ax = a.x + decalage.x * a.r * 8;
      const ay = a.y + decalage.y * a.r * 8;
      for (let j = i + 1; j < actifs; j++) {
        const b = noeuds[j]!;
        const bx = b.x + decalage.x * b.r * 8;
        const by = b.y + decalage.y * b.r * 8;
        const dx = ax - bx;
        const dy = ay - by;
        const d2 = dx * dx + dy * dy;
        if (d2 < portee2) {
          ctx.strokeStyle = `rgba(${OR},${(1 - d2 / portee2) * 0.32})`;
          ctx.beginPath();
          ctx.moveTo(ax, ay);
          ctx.lineTo(bx, by);
          ctx.stroke();
        }
      }
    }
    ctx.fillStyle = `rgba(${OR},0.75)`;
    for (let i = 0; i < actifs; i++) {
      const n = noeuds[i]!;
      ctx.beginPath();
      ctx.arc(n.x + decalage.x * n.r * 8, n.y + decalage.y * n.r * 8, n.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const boucle = (): void => {
    dessiner();
    raf = requestAnimationFrame(boucle);
  };
  const demarrer = (): void => {
    if (enCours || statique || !visible || document.hidden) return;
    enCours = true;
    raf = requestAnimationFrame(boucle);
  };
  const arreter = (): void => {
    enCours = false;
    cancelAnimationFrame(raf);
  };

  redimensionner();
  dessiner();

  new ResizeObserver(() => {
    redimensionner();
    if (statique) dessiner();
  }).observe(canvas);

  new IntersectionObserver(([e]) => {
    visible = !!e?.isIntersecting;
    if (visible) demarrer(); else arreter();
  }).observe(canvas);

  document.addEventListener('visibilitychange', () => (document.hidden ? arreter() : demarrer()));

  if (statique) return;

  window.addEventListener('scroll', () => {
    const hero = canvas.parentElement;
    if (!hero) return;
    densite = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight * 0.8)));
  }, { passive: true });

  window.addEventListener('pointermove', (e) => {
    cible.x = (e.clientX / window.innerWidth - 0.5) * 2;
    cible.y = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  window.addEventListener('deviceorientation', (e) => {
    if (e.gamma == null || e.beta == null) return;
    cible.x = Math.max(-1, Math.min(1, e.gamma / 30));
    cible.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
  }, { passive: true });

  demarrer();
}
