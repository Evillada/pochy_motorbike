import { useId, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ToneGradient } from '@/components/ui/ToneGradient';

const CX = 120;
const CY = 120;
const R = 92;
const START = -120;
const END = 120;
// Needle rests just short of the end stop, like a real tach at redline.
const REST = 116;

/** Point on the dial at `deg` degrees clockwise from 12 o'clock. */
function polar(deg: number, radius: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: CX + radius * Math.sin(rad), y: CY - radius * Math.cos(rad) };
}

function arc(from: number, to: number, radius = R) {
  const a = polar(from, radius);
  const b = polar(to, radius);
  const largeArc = to - from > 180 ? 1 : 0;
  return `M${a.x} ${a.y} A${radius} ${radius} 0 ${largeArc} 1 ${b.x} ${b.y}`;
}

// `mark` is the major tick where that installment is complete.
const SEGMENTS = [
  { from: -120, to: -42, mark: -40, label: '1' },
  { from: -38, to: 38, mark: 40, label: '2' },
  { from: 42, to: 120, mark: 120, label: '3' },
];
const MAJOR_TICKS = new Set([START, ...SEGMENTS.map((s) => s.mark)]);

// Sweep timeline (fractions of DURATION): each installment is a "gear" —
// the needle climbs, overshoots, and drops back a little before the next.
const DURATION = 2.6;
const NEEDLE_KEYFRAMES = [START, -36, -50, 44, 30, REST];
const NEEDLE_TIMES = [0, 0.28, 0.36, 0.64, 0.72, 1];
const SEGMENT_WINDOWS: [number, number][] = [
  [0, 0.28],
  [0.36, 0.64],
  [0.72, 1],
];

const TICKS = Array.from({ length: (END - START) / 10 + 1 }, (_, i) => START + i * 10);

/**
 * Motorcycle tachometer standing in for "pay in installments": the dial
 * fills in three gears, one per cuota, and ends on the logo red.
 */
export function InstallmentGauge({ label, className = '' }: { label: string; className?: string }) {
  const id = `gauge-${useId()}`;
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [idle, setIdle] = useState(false);

  const finished = prefersReducedMotion;
  const play = inView && !finished;

  const needleAnimate = finished
    ? { rotate: REST }
    : idle
      ? { rotate: [REST, REST - 9, REST] }
      : play
        ? { rotate: NEEDLE_KEYFRAMES }
        : { rotate: START };
  const needleTransition = idle
    ? { duration: 0.7, ease: 'easeOut' as const, repeat: Infinity, repeatDelay: 4.5 }
    : { duration: DURATION, times: NEEDLE_TIMES, ease: 'easeInOut' as const };

  return (
    <svg ref={ref} viewBox="0 0 240 240" className={className} aria-hidden>
      <defs>
        <ToneGradient id={`${id}-gold`} tone="champagne" size={240} />
        <ToneGradient id={`${id}-red`} tone="red" size={240} />
        <radialGradient id={`${id}-face`} cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#1c1c1c" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>

      <circle cx={CX} cy={CY} r={R + 20} fill={`url(#${id}-face)`} stroke="#fff" strokeOpacity="0.08" />

      {/* Track */}
      <path d={arc(START, END)} fill="none" stroke="#fff" strokeOpacity="0.08" strokeWidth="6" strokeLinecap="round" />

      {/* Installments, lit one gear at a time */}
      {SEGMENTS.map((segment, i) => {
        const [startAt, endAt] = SEGMENT_WINDOWS[i];
        return (
          <motion.path
            key={segment.label}
            d={arc(segment.from, segment.to)}
            fill="none"
            stroke={`url(#${id}-${i === SEGMENTS.length - 1 ? 'red' : 'gold'})`}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: finished ? 1 : 0 }}
            animate={{ pathLength: finished || play ? 1 : 0 }}
            transition={{ delay: startAt * DURATION, duration: (endAt - startAt) * DURATION, ease: 'easeInOut' }}
            style={i === SEGMENTS.length - 1 ? { filter: 'drop-shadow(0 0 6px rgba(248,26,44,0.6))' } : undefined}
          />
        );
      })}

      {/* Ticks */}
      {TICKS.map((deg) => {
        const major = MAJOR_TICKS.has(deg);
        const outer = polar(deg, R - 10);
        const inner = polar(deg, R - (major ? 20 : 15));
        return (
          <line
            key={deg}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke={`url(#${id}-gold)`}
            strokeOpacity={major ? 0.9 : 0.4}
            strokeWidth={major ? 1.6 : 1}
            strokeLinecap="round"
          />
        );
      })}

      {/* Installment numbers, centered on their segment (clear of the resting needle) */}
      {SEGMENTS.map((segment, i) => {
        const p = polar((segment.from + segment.to) / 2, R - 32);
        return (
          <text
            key={segment.label}
            x={p.x}
            y={p.y + 3.5}
            textAnchor="middle"
            fontSize="11"
            fontWeight="500"
            fill={i === SEGMENTS.length - 1 ? '#ff6b75' : '#e8d5a8'}
          >
            {segment.label}
          </text>
        );
      })}

      {/* Needle — the invisible circle centers its bounding box on the hub,
          so Framer's rotation pivots there. */}
      <g transform={`translate(${CX} ${CY})`}>
        <motion.g
          initial={{ rotate: finished ? REST : START }}
          animate={needleAnimate}
          transition={needleTransition}
          onAnimationComplete={() => {
            if (play && !idle) setIdle(true);
          }}
        >
          <circle r="82" fill="none" />
          <path d="M-2.4 0 L-0.6 -80 L0.6 -80 L2.4 0 Z" fill="#f81a2c" style={{ filter: 'drop-shadow(0 0 4px rgba(248,26,44,0.8))' }} />
          <path d="M-1.6 0 L0 14 L1.6 0 Z" fill="#f81a2c" />
        </motion.g>
        <circle r="8" fill={`url(#${id}-gold)`} />
        <circle r="3" fill="#000" />
      </g>

      <motion.text
        x={CX}
        y={CY + 60}
        textAnchor="middle"
        fontSize="9"
        fontWeight="500"
        letterSpacing="2.5"
        fill="#e8d5a8"
        style={{ textTransform: 'uppercase' }}
        initial={{ opacity: finished ? 1 : 0 }}
        animate={{ opacity: finished || play ? 1 : 0 }}
        transition={{ delay: finished ? 0 : DURATION, duration: 0.6 }}
      >
        {label}
      </motion.text>
    </svg>
  );
}
