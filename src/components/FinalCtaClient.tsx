import { translations, type Lang } from '@/i18n/translations';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinalCtaClient({ lang }: { lang: Lang }) {
  const t = translations[lang];
  const whatsappHref = buildWhatsAppUrl(t.finalCta.whatsappMessage);

  return (
    <MotionRoot>
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40 text-center">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_50%,color-mix(in_oklch,var(--accent)_9%,transparent),transparent_70%)]"
      />
      <div
        className="reveal mx-auto max-w-2xl px-4 sm:px-6"
      >
        <h2 className="font-body text-[2.1rem] sm:text-6xl font-semibold tracking-[-0.035em] leading-[1.05]">
          {t.finalCta.title}
        </h2>
        <p className="mt-4 text-base text-muted-foreground sm:text-lg">{t.finalCta.subtitle}</p>
        <div className="mt-8 flex justify-center sm:mt-10">
          <Button as="a" href={whatsappHref} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
            {t.finalCta.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
