// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// URL publique du site : à remplacer par le nom de domaine définitif.
const SITE = process.env.SITE_URL ?? 'https://bidoss-paraiso.pages.dev';

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  build: { inlineStylesheets: 'always', format: 'file' },
  compressHTML: true,
  prefetch: false,
  devToolbar: { enabled: false },
  vite: { plugins: [tailwindcss()] },
});
