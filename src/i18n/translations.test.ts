import { describe, expect, it } from 'vitest';
import { LANGS, translations } from './translations';

function collectKeys(obj: unknown, prefix = ''): string[] {
  if (Array.isArray(obj)) {
    return obj.length > 0 ? collectKeys(obj[0], `${prefix}[]`) : [`${prefix}[]`];
  }
  if (obj && typeof obj === 'object') {
    return Object.entries(obj as Record<string, unknown>).flatMap(([key, value]) =>
      collectKeys(value, prefix ? `${prefix}.${key}` : key),
    );
  }
  return [prefix];
}

describe('translations', () => {
  const esKeys = collectKeys(translations.es).sort();

  it.each(LANGS)('%s exposes the exact same key shape as es', (lang) => {
    expect(collectKeys(translations[lang]).sort()).toEqual(esKeys);
  });

  it.each(LANGS)('%s has the same number of list items as es', (lang) => {
    const t = translations[lang];
    expect(t.services.items.length).toBe(translations.es.services.items.length);
    expect(t.financing.options.length).toBe(translations.es.financing.options.length);
    expect(t.whyUs.points.length).toBe(translations.es.whyUs.points.length);
  });
});
