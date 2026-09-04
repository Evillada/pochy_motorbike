import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ServicesClient from './ServicesClient';
import { translations } from '@/i18n/translations';

describe('ServicesClient', () => {
  it('renders one card per service with a WhatsApp quote link', () => {
    render(<ServicesClient />);

    const items = translations.es.services.items;
    expect(screen.getAllByText('Cotizar')).toHaveLength(items.length);

    const oilChangeLink = screen.getByRole('link', { name: /Cotizar.*Cambio de aceite/s });
    expect(oilChangeLink.getAttribute('href')).toContain(
      encodeURIComponent(items[1].whatsappMessage).slice(0, 20),
    );
  });
});
