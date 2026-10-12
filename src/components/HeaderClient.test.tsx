import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderClient from './HeaderClient';

describe('HeaderClient', () => {
  it('renders nav labels in the page language', () => {
    render(<HeaderClient lang="fr" />);
    expect(screen.getByRole('link', { name: 'Pourquoi nous' })).toBeInTheDocument();
  });

  it('opens a language menu linking to each language URL', async () => {
    render(<HeaderClient lang="es" />);
    expect(screen.getByRole('link', { name: 'Servicios' })).toBeInTheDocument();

    const toggle = screen.getByRole('button', { name: 'Idioma' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByRole('link', { name: /English/ })).toHaveAttribute('href', '/en/');
    expect(screen.getByRole('link', { name: /Português/ })).toHaveAttribute('href', '/pt/');
    expect(screen.getByRole('link', { name: /Français/ })).toHaveAttribute('href', '/fr/');
    expect(screen.getByRole('link', { name: /Español/ })).toHaveAttribute('aria-current', 'page');
  });
});
