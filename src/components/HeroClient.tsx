import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotoGlyph } from '@/components/ui/MotoGlyph';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function HeroClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);

  return (
    <MotionRoot>
    <section id="top" className="relative flex min-h-screen scroll-mt-24 items-center overflow-hidden pt-24">
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
            className="mt-4 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p variants={item} className="mt-5 max-w-lg text-lg text-muted-foreground">
            {t.hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.hero.ctaPrimary}
            </Button>
            <Button as="a" href="#services" variant="ghost">
              {t.hero.ctaSecondary}
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="mx-auto w-full max-w-sm"
        >
          <MotoGlyph className="w-full drop-shadow-[0_0_40px_color-mix(in_oklch,var(--primary)_35%,transparent)]" />
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
