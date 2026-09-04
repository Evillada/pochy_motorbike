import { describe, expect, it } from 'vitest';
import { translations } from './translations';

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
  it('es and en expose the exact same key shape', () => {
    const esKeys = collectKeys(translations.es).sort();
    const enKeys = collectKeys(translations.en).sort();
    expect(enKeys).toEqual(esKeys);
  });

  it('has at least one service item per language', () => {
    expect(translations.es.services.items.length).toBeGreaterThan(0);
    expect(translations.en.services.items.length).toBe(translations.es.services.items.length);
  });
});
