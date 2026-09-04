import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppButtonClient from './WhatsAppButtonClient';
import { WHATSAPP_PHONE } from '@/lib/whatsapp';

describe('WhatsAppButtonClient', () => {
  it('links to wa.me with the shop number and a default greeting', () => {
    render(<WhatsAppButtonClient />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link.getAttribute('href')).toContain(`https://wa.me/${WHATSAPP_PHONE}`);
  });
});
