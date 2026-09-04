import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FooterClient from './FooterClient';

describe('FooterClient', () => {
  it('links to the Instagram profile and shows the current year', () => {
    render(<FooterClient />);

    const instagramLink = screen.getByRole('link', { name: 'Síguenos en Instagram' });
    expect(instagramLink).toHaveAttribute('href', 'https://www.instagram.com/pochy_motorbike/');

    expect(screen.getByText(new RegExp(String(new Date().getFullYear())))).toBeInTheDocument();
  });
});
