import { describe, expect, it } from 'vitest';
import { buildWhatsAppUrl, WHATSAPP_PHONE } from './whatsapp';

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me URL with the default shop number and encoded message', () => {
    const url = buildWhatsAppUrl('Hola, ¿tienen frenos?');
    expect(url).toBe(`https://wa.me/${WHATSAPP_PHONE}?text=Hola%2C%20%C2%BFtienen%20frenos%3F`);
  });

  it('accepts an override phone number', () => {
    const url = buildWhatsAppUrl('hi', '5731112222');
    expect(url).toBe('https://wa.me/5731112222?text=hi');
  });
});
