import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhyUsClient from './WhyUsClient';
import { translations } from '@/i18n/translations';

describe('WhyUsClient', () => {
  it('renders every trust point title', () => {
    render(<WhyUsClient />);
    for (const point of translations.es.whyUs.points) {
      expect(screen.getByText(point.title)).toBeInTheDocument();
    }
  });
});
