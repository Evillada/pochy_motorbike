import { useId, type ReactNode } from 'react';

export type ServiceIconKind = 'maintenance' | 'oil' | 'brakes' | 'electrical' | 'parts';

interface ServiceIconProps {
  kind: ServiceIconKind;
  className?: string;
}

/**
 * Original line-art pictogram per service, framed in the same thin gauge
 * ring used behind the Hero badge — small, consistent visual language
 * instead of a generic icon-font glyph or a stock photo per card.
 */
export function ServiceIcon({ kind, className = '' }: ServiceIconProps) {
  const gradientId = `svc-gradient-${useId()}`;

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="28"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeDasharray="3 7"
        opacity="0.5"
      />

      <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {ICON_PATHS[kind]}
      </g>
    </svg>
  );
}

const ICON_PATHS: Record<ServiceIconKind, ReactNode> = {
  // Wrench, angled across the badge — general maintenance/check-up.
  maintenance: (
    <path d="M23 41 L36 28 M40 24a5 5 0 1 1-7 7l-15 15a3 3 0 0 0 4 4l15-15a5 5 0 0 0 7-7l-4 4-3-3z" />
  ),
  // Oil drop with a level line through it — oil change.
  oil: (
    <>
      <path d="M32 18c6 8 9 13 9 18a9 9 0 1 1-18 0c0-5 3-10 9-18Z" />
      <path d="M25 38h14" />
    </>
  ),
  // Brake disc: outer rotor, hub, and vent slots.
  brakes: (
    <>
      <circle cx="32" cy="32" r="12" />
      <circle cx="32" cy="32" r="3.5" />
      <path d="M32 22v4M42 32h-4M32 42v-4M22 32h4" />
    </>
  ),
  // Lightning bolt — electrical diagnostics.
  electrical: <path d="M35 18 L24 35h8l-3 13 13-19h-8l3-11Z" />,
  // Hex bolt head with a center hole — spare parts.
  parts: (
    <>
      <path d="M32 17l11 6.3v12.4L32 42l-11-6.3V23.3Z" />
      <circle cx="32" cy="29.5" r="4" />
    </>
  ),
};
