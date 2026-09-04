import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// Apple's characteristic decelerating curve — used across this file instead
// of the default easeOut for a softer, more premium settle.
const EASE_APPLE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_APPLE } },
};

export default function HeroClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  // Scroll-linked MotionValues bound via `style` bypass MotionConfig's
  // reducedMotion handling (that only covers animate/variants/while*), so
  // the parallax range is guarded manually here.
  const prefersReducedMotion = useReducedMotion();
  const badgeY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 80]);

  // 3D tilt: the badge leans toward the cursor, like a mounted metal plate
  // catching the light — a physical object, not a flat icon. Spring-damped
  // so it settles instead of snapping when the cursor jumps.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 18, mass: 0.4 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 18, mass: 0.4 });

  function handleBadgePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
    tiltY.set(relativeX * 24);
    tiltX.set(relativeY * -24);
  }

  function handleBadgePointerLeave() {
    tiltX.set(0);
    tiltY.set(0);
  }

  return (
    <MotionRoot>
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklch,var(--primary)_28%,transparent),transparent_70%)] animate-glow-pulse"
      />
      <div
        aria-hidden
        className="absolute -right-24 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_35%,transparent),transparent)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-accent"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 font-body text-5xl font-extrabold tracking-tight leading-[0.98] sm:text-7xl lg:text-8xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-lg text-lg sm:text-xl text-muted-foreground">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.hero.ctaPrimary}
            </Button>
            <Button as="a" href="#services" variant="ghost">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_APPLE, delay: 0.2 }}
          style={{ y: badgeY, perspective: 1200 }}
          className="mx-auto w-full max-w-sm"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
            onPointerMove={handleBadgePointerMove}
            onPointerLeave={handleBadgePointerLeave}
            style={{ rotateX: springTiltX, rotateY: springTiltY, transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* Slow-spinning gauge ring behind the badge — the one piece of
                pure motion-graphics left in the hero, standing in for the
                shop's own diagnostic/torque gauges rather than illustrating
                a generic icon. */}
            <motion.svg
              aria-hidden
              viewBox="0 0 200 200"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
              className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-40"
              style={{ transform: 'translateZ(-40px)' }}
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="url(#hero-ring-gradient)"
                strokeWidth="1.5"
                strokeDasharray="4 10"
              />
              <defs>
                <linearGradient id="hero-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>
            </motion.svg>

            <div
              className="relative overflow-hidden rounded-[2rem] p-3"
              style={{
                transform: 'translateZ(30px)',
                boxShadow:
                  '0 40px 80px -30px color-mix(in oklch, var(--primary) 45%, transparent), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(155deg, color-mix(in oklch, var(--card) 90%, transparent), color-mix(in oklch, var(--background) 95%, transparent))',
              }}
            >
              <img
                src="/images/pochy-logo.jpg"
                alt="Pochy MotorBike"
                className="w-full rounded-2xl mix-blend-screen"
              />

              {/* Diagonal light sweep — reads as a badge catching a passing
                  light, echoing a polished metal shop plate. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 -skew-x-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.18) 45%, transparent 60%)',
                }}
                animate={{ x: ['-120%', '160%'] }}
                transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.4 }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
