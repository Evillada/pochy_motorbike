import { describe, expect, it } from 'vitest';
import { buildLocalBusinessJsonLd, serializeJsonLd } from './structuredData';

describe('buildLocalBusinessJsonLd', () => {
  it('describes the shop as an AutoRepair business with address, phone, and Instagram', () => {
    const ld = buildLocalBusinessJsonLd({
      pageUrl: 'https://pochy.test/',
      imageUrl: 'https://pochy.test/images/og-image.jpg',
      description: 'Taller de motos',
      langCode: 'es',
    });

    expect(ld['@type']).toBe('AutoRepair');
    expect(ld.telephone).toBe('+573114021002');
    expect(ld.address.addressLocality).toBe('Medellín');
    expect(ld.address.addressCountry).toBe('CO');
    expect(ld.sameAs).toContain('https://www.instagram.com/pochy_motorbike/');
  });
});

describe('serializeJsonLd', () => {
  it('escapes "<" so the payload cannot close its script tag', () => {
    expect(serializeJsonLd({ x: '</script>' })).toBe('{"x":"\\u003c/script>"}');
  });
});
