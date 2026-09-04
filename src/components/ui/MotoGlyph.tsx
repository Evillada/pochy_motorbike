import { useId } from 'react';
import { motion } from 'framer-motion';

interface MotoGlyphProps {
  className?: string;
  /**
   * Pass true when adjacent visible text already names the mark (e.g. the
   * header's "Pochy MotorBike" label) or when it's purely decorative (e.g.
   * the footer) — hides it from the accessibility tree instead of
   * duplicating the accessible name.
   */
  decorative?: boolean;
}

/**
 * Original mark for Pochy MotorBike: a hex outline pierced by a speed line,
 * with a rotating gear at its core. Built entirely from inline SVG — no
 * stock art or icon-font glyph.
 */
export function MotoGlyph({ className = '', decorative = false }: MotoGlyphProps) {
  // Each rendered instance needs its own gradient id — three copies of this
  // component land in the DOM (Header, Hero, Footer), and a hardcoded id
  // would produce invalid duplicate-id HTML plus cross-instance gradient
  // references.
  const gradientId = `pochy-glyph-gradient-${useId()}`;

  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': 'Pochy MotorBike' })}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <motion.path
        d="M100 8 L182 52 V148 L100 192 L18 148 V52 Z"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeInOut' }}
      />

      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, ease: 'linear', repeat: Infinity }}
      >
        <circle cx={100} cy={100} r={26} fill="none" stroke={`url(#${gradientId})`} strokeWidth={3} />
        {Array.from({ length: 8 }).map((_, i) => (
          <rect
            key={i}
            x={97}
            y={68}
            width={6}
            height={12}
            rx={1.5}
            fill={`url(#${gradientId})`}
            transform={`rotate(${(i * 360) / 8} 100 100)`}
          />
        ))}
      </motion.g>

      <motion.path
        d="M32 118 L84 118 L96 100 L112 136 L124 118 L168 118"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.6 }}
      />
    </svg>
  );
}
