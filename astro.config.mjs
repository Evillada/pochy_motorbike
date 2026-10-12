import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Vercel exposes the project's production domain (host only, no protocol) at
// build time; an explicit PUBLIC_SITE_URL, e.g. a custom domain, wins over it.
const SITE_URL =
  env.PUBLIC_SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined);

// Canonical, hreflang, Open Graph, JSON-LD and the sitemap are all built from
// `site`. Building without it would ship URLs pointing at the wrong domain,
// so the build stops instead.
const requireSiteUrl = {
  name: 'require-site-url',
  hooks: {
    'astro:build:start': () => {
      if (!SITE_URL) {
        throw new Error(
          'No site URL. Set PUBLIC_SITE_URL (see .env.example) to the real domain, e.g. https://pochymotorbike.com — on Vercel it defaults to the project production domain.',
        );
      }
    },
  },
};

export default defineConfig({
  site: SITE_URL,
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    requireSiteUrl,
  ],
  output: 'static',
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        '@': new URL('./src', import.meta.url).pathname,
      },
    },
    build: {
      cssMinify: true,
    },
  },
});
