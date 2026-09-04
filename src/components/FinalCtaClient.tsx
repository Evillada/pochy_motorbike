import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinalCtaClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.finalCta.whatsappMessage);

  return (
    <MotionRoot>
    <section className="relative overflow-hidden py-28 sm:py-40 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklch,var(--primary)_25%,transparent),transparent_70%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-2xl px-4 sm:px-6"
      >
        <h2 className="font-body text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          {t.finalCta.title}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">{t.finalCta.subtitle}</p>
        <div className="mt-10 flex justify-center">
          <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
            {t.finalCta.ctaLabel}
          </Button>
        </div>
      </motion.div>
    </section>
    </MotionRoot>
  );
}
