import { LANGS, langPath } from '@/i18n/translations';

/** One <url> per language, each listing every translation as an hreflang alternate. */
export function buildSitemapXml(site: URL): string {
  const urls = LANGS.map((lang) => {
    const alternates = LANGS.map(
      (alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${new URL(langPath(alt), site).href}"/>`,
    ).join('');
    return `<url><loc>${new URL(langPath(lang), site).href}</loc>${alternates}</url>`;
  }).join('');

  return (
    '<?xml version="1.0" encoding="UTF-8"?>' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">' +
    urls +
    '</urlset>'
  );
}
