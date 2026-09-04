import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FinancingClient from './FinancingClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';
import { translations } from '@/i18n/translations';

describe('FinancingClient', () => {
  it('renders the Addi callout description and a WhatsApp CTA', () => {
    render(<FinancingClient />);
    // Both the description and the CTA label contain the word "Addi", so
    // match the full description text (its element's only text node) rather
    // than a bare /Addi/ substring, which would match both and throw.
    expect(screen.getByText(translations.es.financing.description)).toBeInTheDocument();
    const cta = screen.getByRole('link', { name: 'Preguntar por Addi' });
    expect(cta.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });
});
