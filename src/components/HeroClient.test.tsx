import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroClient from './HeroClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

describe('HeroClient', () => {
  it('renders the Spanish headline and a primary CTA linking to WhatsApp', () => {
    render(<HeroClient />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Tu moto, en manos que sí saben.');

    const cta = screen.getByRole('link', { name: 'Agenda por WhatsApp' });
    expect(cta.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });

  it('renders a secondary CTA that anchors to the services section', () => {
    render(<HeroClient />);
    expect(screen.getByRole('link', { name: 'Ver servicios' })).toHaveAttribute('href', '#services');
  });
});
