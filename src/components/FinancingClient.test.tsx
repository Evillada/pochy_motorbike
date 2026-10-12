import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FinancingClient from './FinancingClient';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { translations } from '@/i18n/translations';

describe('FinancingClient', () => {
  it('renders the financing description and a WhatsApp CTA for Addi, Sistecrédito, and Redeban', () => {
    render(<FinancingClient lang="es" />);
    expect(screen.getByText(translations.es.financing.description)).toBeInTheDocument();

    for (const [label, option] of [
      ['Preguntar por Addi', translations.es.financing.options[0]],
      ['Preguntar por Sistecrédito', translations.es.financing.options[1]],
      ['Pagar con Redeban', translations.es.financing.options[2]],
    ] as const) {
      const cta = screen.getByRole('link', { name: label });
      expect(cta).toHaveAttribute('href', buildWhatsAppUrl(option.whatsappMessage));
    }
  });

  it('labels the installment gauge in the page language', () => {
    render(<FinancingClient lang="fr" />);
    expect(screen.getByText('Prêt à rouler')).toBeInTheDocument();
  });
});
