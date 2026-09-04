import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import LocationHoursClient from './LocationHoursClient';

describe('LocationHoursClient', () => {
  it('links to a Google Maps search for the shop name and city', () => {
    render(<LocationHoursClient />);
    const link = screen.getByRole('link', { name: 'Ver en Google Maps' });
    expect(link.getAttribute('href')).toBe(
      'https://www.google.com/maps/search/?api=1&query=Pochy%20MotorBike%20Medell%C3%ADn',
    );
  });

  it('renders every hours row', () => {
    render(<LocationHoursClient />);
    expect(screen.getByText('Lunes a viernes')).toBeInTheDocument();
    expect(screen.getByText('Domingo')).toBeInTheDocument();
  });
});
