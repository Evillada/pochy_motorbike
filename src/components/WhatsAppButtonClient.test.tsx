import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButtonClient from './WhatsAppButtonClient';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { translations } from '@/i18n/translations';

describe('WhatsAppButtonClient', () => {
  it('links to wa.me with the shop number and a default greeting', () => {
    render(<WhatsAppButtonClient />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toHaveAttribute('href', buildWhatsAppUrl(translations.es.hero.whatsappMessage));
  });
});
