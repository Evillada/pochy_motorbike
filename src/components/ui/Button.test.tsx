import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders as a link with the given href when as="a"', () => {
    render(
      <Button as="a" href="https://wa.me/123">
        Agenda por WhatsApp
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Agenda por WhatsApp' });
    expect(link).toHaveAttribute('href', 'https://wa.me/123');
  });

  it('renders as a button and fires onClick when as="button"', async () => {
    const onClick = vi.fn();
    render(
      <Button as="button" onClick={onClick}>
        Ver servicios
      </Button>,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Ver servicios' }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
