import { useId } from 'react';
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Wallet, MapPin, type LucideIcon } from 'lucide-react';
import { translations, type Lang } from '@/i18n/translations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { ToneGradient, TONE_COLOR, type Tone } from '@/components/ui/ToneGradient';

// Order matches translations.ts whyUs.points: personalized attention, quality
// parts, financing, Medellín location.
const POINTS: { Icon: LucideIcon; tone: Tone }[] = [
  { Icon: Handshake, tone: 'pearl' },
  { Icon: ShieldCheck, tone: 'champagne' },
  { Icon: Wallet, tone: 'holo' },
  { Icon: MapPin, tone: 'red' },
];

export default function WhyUsClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const idPrefix = `why-${useId()}`;

  return (
    <MotionRoot>
    <section id="why-us" className="relative scroll-mt-24 py-16 sm:py-28 lg:py-36 overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_40%_at_50%_30%,color-mix(in_oklch,var(--accent)_7%,transparent),transparent_75%)]"
      />
      {/* Lucide icons are separate SVGs, so their gradients live here and are
          referenced by id. Not display:none — that stops gradients painting. */}
      <svg aria-hidden width="0" height="0" className="absolute">
        <defs>
          {POINTS.map(({ tone }, i) => (
            <ToneGradient key={tone} id={`${idPrefix}-${i}`} tone={tone} size={24} />
          ))}
        </defs>
      </svg>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} align="center" />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-6 lg:grid-cols-4">
          {t.whyUs.points.map((point, i) => {
            const { Icon, tone } = POINTS[i] ?? POINTS[0];
            const color = TONE_COLOR[tone];
            return (
              <motion.div
                key={point.title}
                whileHover={{ y: -4 }}
                className="reveal card-surface p-4 text-center sm:p-8"
              >
                <span
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full sm:h-14 sm:w-14 ${tone === 'holo' ? 'holo-ring' : ''}`}
                  style={{
                    backgroundColor: `color-mix(in oklch, ${color} 7%, transparent)`,
                    boxShadow: tone === 'holo' ? undefined : `0 0 0 1px color-mix(in oklch, ${color} 30%, transparent)`,
                  }}
                >
                  <Icon
                    className="h-5 w-5 sm:h-6 sm:w-6"
                    color={`url(#${idPrefix}-${i})`}
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </span>
                <h3 className="mt-3 font-body text-base font-semibold leading-tight tracking-[-0.01em] sm:mt-5 sm:text-lg">{point.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
