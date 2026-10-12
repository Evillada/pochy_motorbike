import type { APIRoute } from 'astro';
import { buildSitemapXml } from '@/lib/sitemap';

export const GET: APIRoute = ({ site }) => {
  if (!site) return new Response('Set PUBLIC_SITE_URL to generate the sitemap.', { status: 404 });
  return new Response(buildSitemapXml(site), {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
