import { translations, type Lang } from '@/i18n/translations';
import { InstallmentGauge } from './InstallmentGauge';
import { Button } from '@/components/ui/Button';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

export default function FinancingClient({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <MotionRoot>
    <section className="relative py-12 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="reveal card-surface relative overflow-hidden p-6 sm:p-10 lg:p-14"
        >
          <div
            aria-hidden
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_16%,transparent),transparent)]"
          />
          <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">
                {t.financing.eyebrow}
              </span>
              <h2 className="mt-3 max-w-xl font-body text-[1.75rem] sm:text-4xl font-semibold tracking-[-0.03em] leading-tight">
                {t.financing.title}
              </h2>
              <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">{t.financing.description}</p>
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
                {t.financing.options.map((option, i) => (
                  <Button
                    key={option.name}
                    as="a"
                    href={buildWhatsAppUrl(option.whatsappMessage)}
                    target="_blank"
                    rel="noreferrer"
                    variant={i === 0 ? 'primary' : 'ghost'}
                    className="w-full sm:w-auto"
                  >
                    {option.ctaLabel}
                  </Button>
                ))}
              </div>
            </div>
            <InstallmentGauge
              label={t.financing.gaugeLabel}
              className="order-first mx-auto w-full max-w-[220px] sm:max-w-[260px] lg:order-none lg:max-w-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
