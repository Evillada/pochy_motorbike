import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocationHoursClient from './LocationHoursClient';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildMapsEmbedUrl } from '@/lib/maps';
import { translations } from '@/i18n/translations';
import { BUSINESS, FULL_ADDRESS } from '@/lib/business';

describe('LocationHoursClient', () => {
  it('links to a Google Maps search for the shop name and city', () => {
    render(<LocationHoursClient lang="es" />);
    const link = screen.getByRole('link', { name: 'Ver en Google Maps' });
    expect(link.getAttribute('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Pochy%20Motorbike%20Medell%C3%ADn',
    );
  });

  it('embeds a Google Map of the shop', () => {
    render(<LocationHoursClient lang="es" />);
    const map = screen.getByTitle(translations.es.location.mapTitle);
    expect(map).toHaveAttribute('src', buildMapsEmbedUrl(BUSINESS.mapsQuery));
  });

  it('shows the street address and a click-to-call phone link', () => {
    render(<LocationHoursClient lang="es" />);
    expect(screen.getByText(FULL_ADDRESS, { exact: false })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: BUSINESS.phoneDisplay })).toHaveAttribute(
      'href',
      `tel:${BUSINESS.phoneE164}`,
    );
  });

  it('shows appointment-only hours with a WhatsApp request button', () => {
    render(<LocationHoursClient lang="es" />);
    expect(screen.getByText('Solo con cita previa')).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Solicitar cita por WhatsApp' });
    expect(cta).toHaveAttribute('href', buildWhatsAppUrl(translations.es.location.appointmentWhatsappMessage));
  });
});
