import { useRef, type PointerEvent as ReactPointerEvent } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { translations, type Lang } from '@/i18n/translations';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function HeroClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
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
      className="relative flex scroll-mt-24 items-center overflow-hidden pt-28 pb-16 sm:pt-32 lg:min-h-[100svh] lg:pt-24 lg:pb-0"
    >
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_14%,transparent),transparent)] animate-drift" />
        <div className="absolute -bottom-1/3 -right-1/4 h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)] animate-drift-slow" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Entrance is pure CSS so the headline is visible in the server HTML
            (and to crawlers) without waiting for React to hydrate. */}
        <div>
          <h1 className="font-body">
            <span className="block text-xs font-medium uppercase tracking-[0.3em] text-accent animate-fade-up">
              {t.hero.eyebrow}
            </span>
            <span className="text-shine mt-6 block pb-1 text-[2.75rem] font-semibold tracking-[-0.035em] leading-[1.02] sm:text-7xl lg:text-8xl animate-title">
              {t.hero.title}
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed sm:text-xl text-muted-foreground animate-fade-up [animation-delay:300ms]">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 animate-fade-up [animation-delay:450ms]">
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
              {t.hero.ctaPrimary}
            </Button>
            <Button as="a" href="#services" variant="ghost" className="w-full sm:w-auto">
              {t.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <motion.div
          style={{ y: badgeY, perspective: 1200 }}
          className="mx-auto w-full max-w-[240px] sm:max-w-xs lg:max-w-sm"
        >
          <div className="animate-fade-in-scale">
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
                  <stop offset="0%" stopColor="var(--accent)" />
                  <stop offset="100%" stopColor="var(--accent-deep)" />
                </linearGradient>
              </defs>
            </motion.svg>

            <div
              className="relative overflow-hidden rounded-[2rem] p-3"
              style={{
                transform: 'translateZ(30px)',
                boxShadow:
                  '0 0 0 1px var(--border), 0 50px 90px -40px rgba(0,0,0,0.9), 0 0 80px -30px color-mix(in oklch, var(--accent) 35%, transparent), inset 0 1px 0 0 rgba(255,255,255,0.08)',
                background:
                  'linear-gradient(155deg, color-mix(in oklch, var(--card) 90%, transparent), color-mix(in oklch, var(--background) 95%, transparent))',
              }}
            >
              <img
                src="/images/pochy-logo.jpg"
                alt="Pochy Motorbike"
                width={536}
                height={367}
                className="h-auto w-full rounded-2xl mix-blend-screen"
              />

              {/* Diagonal light sweep — reads as a badge catching a passing
                  light, echoing a polished metal shop plate. */}
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 -skew-x-12"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 45%, transparent 60%)',
                }}
                animate={{ x: ['-120%', '160%'] }}
                transition={{ duration: 3.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.4 }}
              />
            </div>
          </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
