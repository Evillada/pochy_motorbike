import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeaderClient from './HeaderClient';

describe('HeaderClient', () => {
  it('shows Spanish nav labels by default and switches to English on toggle', async () => {
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
