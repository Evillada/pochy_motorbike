import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinancingClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.financing.whatsappMessage);

  return (
    <MotionRoot>
    <section className="speed-divider relative py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-r from-card to-card p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_40%,transparent),transparent)]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t.financing.eyebrow}
          </span>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-bold sm:text-3xl">
            {t.financing.title}
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{t.financing.description}</p>
          <div className="mt-6">
            <Button as="a" href={whatsappHref}>
              {t.financing.ctaLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
