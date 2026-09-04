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
    <section className="speed-divider relative overflow-hidden py-24 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklch,var(--primary)_25%,transparent),transparent_70%)]"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-2xl px-4 sm:px-6"
      >
        <h2 className="font-display text-3xl font-bold sm:text-4xl">{t.finalCta.title}</h2>
        <p className="mt-3 text-muted-foreground">{t.finalCta.subtitle}</p>
        <div className="mt-8 flex justify-center">
          <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer">
            {t.finalCta.ctaLabel}
          </Button>
        </div>
      </motion.div>
    </section>
    </MotionRoot>
  );
}
