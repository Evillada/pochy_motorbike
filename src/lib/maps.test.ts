import { describe, expect, it } from 'vitest';
import { buildMapsEmbedUrl, buildMapsSearchUrl } from './maps';

describe('buildMapsSearchUrl', () => {
  it('builds a Google Maps search URL from a free-text query', () => {
    const url = buildMapsSearchUrl('Pochy MotorBike Medellín');
    expect(url).toBe(
      'https://www.google.com/maps/search/?api=1&query=Pochy%20MotorBike%20Medell%C3%ADn',
    );
  });
});

describe('buildMapsEmbedUrl', () => {
  it('builds a keyless Google Maps embed URL from a free-text query', () => {
    const url = buildMapsEmbedUrl('Pochy MotorBike Medellín');
    expect(url).toBe('https://www.google.com/maps?q=Pochy%20MotorBike%20Medell%C3%ADn&output=embed');
  });
});
