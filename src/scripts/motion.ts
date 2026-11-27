/** Réglages communs du mouvement (courbes, durées, détection des préférences). */
export const reduit = (): boolean => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const pointeurFin = (): boolean =>
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;
export const estMobile = (): boolean => window.matchMedia('(max-width: 767px)').matches;

export const EASE = {
  entree: 'expo.out',
  entreeDouce: 'power3.out',
  transition: 'power2.inOut',
} as const;

export const DUREE = { courte: 0.4, moyenne: 0.8, longue: 1.2 } as const;
export const STAGGER = { serre: 0.04, normal: 0.08, large: 0.12 } as const;

/** Lance une fonction quand le navigateur est libre (sans bloquer les interactions). */
export const quandLibre = (fn: () => void, delai = 1500): void => {
  if ('requestIdleCallback' in window) window.requestIdleCallback(fn, { timeout: delai });
  else setTimeout(fn, 200);
};
