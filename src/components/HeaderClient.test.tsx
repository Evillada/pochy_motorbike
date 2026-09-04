import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('HeaderClient', () => {
  beforeEach(() => {
    window.localStorage.clear();
    // jsdom defaults navigator.language to "en-US", which would make the
    // language store's first-visit fallback pick "en". Pin it so the default
    // is "es" in this test.
    vi.stubGlobal('navigator', { ...window.navigator, language: 'es-CO' });
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('shows Spanish nav labels by default and switches to English on toggle', async () => {
    const { default: HeaderClient } = await import('./HeaderClient');
    render(<HeaderClient />);

    expect(screen.getByRole('link', { name: 'Servicios' })).toBeInTheDocument();

    // The toggle's only direct text node is the 2-letter target-language code
    // ("EN" while in Spanish); querying by that exact text avoids ambiguity
    // with the hamburger button, whose accessible name ("Menu") happens to
    // contain the substring "en" too.
    await userEvent.click(screen.getByText('EN'));

    expect(screen.getByRole('link', { name: 'Services' })).toBeInTheDocument();
  });
});
