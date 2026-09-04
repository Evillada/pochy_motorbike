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
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="card-surface relative overflow-hidden p-10 sm:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_40%,transparent),transparent)]"
          />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            {t.financing.eyebrow}
          </span>
          <h2 className="mt-3 max-w-xl font-body text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t.financing.title}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">{t.financing.description}</p>
          <div className="mt-8">
            <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
              {t.financing.ctaLabel}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
    </MotionRoot>
  );
}
