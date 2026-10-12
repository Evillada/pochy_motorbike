import { describe, expect, it } from 'vitest';
import { buildSitemapXml } from './sitemap';

describe('buildSitemapXml', () => {
  it('lists every language URL with hreflang alternates', () => {
    const xml = buildSitemapXml(new URL('https://pochy.test'));

    for (const loc of ['https://pochy.test/', 'https://pochy.test/en/', 'https://pochy.test/pt/', 'https://pochy.test/fr/']) {
      expect(xml).toContain(`<loc>${loc}</loc>`);
    }
    expect(xml).toContain('<xhtml:link rel="alternate" hreflang="fr" href="https://pochy.test/fr/"/>');
  });
});
