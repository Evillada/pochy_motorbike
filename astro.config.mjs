import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

const { PUBLIC_SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');

// Canonical, hreflang, Open Graph, JSON-LD and the sitemap are all built from
// `site`. Building without it would ship URLs pointing at the wrong domain,
// so the build stops instead.
const requireSiteUrl = {
  name: 'require-site-url',
  hooks: {
    'astro:build:start': () => {
      if (!PUBLIC_SITE_URL) {
        throw new Error(
          'PUBLIC_SITE_URL is not set. Copy .env.example to .env (or set it in your hosting provider) with the real domain, e.g. https://pochymotorbike.com',
        );
      }
    },
  },
};

export default defineConfig({
  site: PUBLIC_SITE_URL || undefined,
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
