import { useReducedMotion } from 'framer-motion';

/**
 * Metallic finishes for line icons, one per meaning: steel for general
 * maintenance, pearl for oil, the logo's red for brakes, electric blue for
 * electrics, champagne for parts, and an iridescent "credit card" finish
 * for financing.
 */
export type Tone = 'steel' | 'pearl' | 'red' | 'electric' | 'champagne' | 'holo';

const TONE_STOPS: Record<Tone, string[]> = {
  steel: ['#f4f4f5', '#a1a1aa', '#52525b'],
  pearl: ['#ffffff', '#f5f5f4', '#c8c4bd'],
  red: ['#ff6b75', '#f81a2c', '#a3111e'],
  electric: ['#bae6fd', '#38bdf8', '#2563eb'],
  champagne: ['#f3e3c3', '#d9bf8c', '#a8844f'],
  holo: ['#f5d0a9', '#f9a8d4', '#c4b5fd', '#93c5fd', '#99f6e4', '#f5d0a9'],
};

/** Mid-tone of each finish, for rings and tints around the icon. */
export const TONE_COLOR: Record<Tone, string> = {
  steel: '#a1a1aa',
  pearl: '#f5f5f4',
  red: '#f81a2c',
  electric: '#38bdf8',
  champagne: '#d9bf8c',
  holo: '#c4b5fd',
};

/**
 * `size` is the icon's viewBox edge. The gradient is laid out in that user
 * space rather than per-shape bounding boxes, because a perfectly straight
 * line has a zero-height box and would otherwise not paint at all.
 */
export function ToneGradient({ id, tone, size }: { id: string; tone: Tone; size: number }) {
  const prefersReducedMotion = useReducedMotion();
  const stops = TONE_STOPS[tone];
  const center = size / 2;

  return (
    <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={size} y2={size}>
      {stops.map((color, i) => (
        <stop key={i} offset={`${(i / (stops.length - 1)) * 100}%`} stopColor={color} />
      ))}
      {tone === 'holo' && !prefersReducedMotion ? (
        <animateTransform
          attributeName="gradientTransform"
          type="rotate"
          values={`0 ${center} ${center};360 ${center} ${center}`}
          dur="8s"
          repeatCount="indefinite"
        />
      ) : null}
    </linearGradient>
  );
}
