import { motion } from 'framer-motion';
import { translations, type Lang } from '@/i18n/translations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { ServiceIcon, type ServiceIconKind } from '@/components/ui/ServiceIcon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// Order matches translations.ts services.items: general maintenance, oil
// change, brakes, electrical diagnostics, spare parts.
const SERVICE_ICONS: ServiceIconKind[] = ['maintenance', 'oil', 'brakes', 'electrical', 'parts'];

export default function ServicesClient({ lang }: { lang: Lang }) {
  const t = translations[lang];

  return (
    <MotionRoot>
    <section id="services" className="relative scroll-mt-24 py-16 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        {/* Phones get a swipeable row (the peeking next card signals it scrolls)
            instead of five full-width cards stacked down the page. */}
        <div className="reveal -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-6 pt-2 scrollbar-hide sm:mx-0 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:p-0 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <motion.article
              key={service.title}
              whileHover={{ y: -4 }}
              className="card-surface group relative w-[78%] shrink-0 snap-start overflow-hidden p-6 sm:w-auto sm:p-7"
            >
              <ServiceIcon kind={SERVICE_ICONS[i] ?? 'maintenance'} className="h-12 w-12" />
              <h3 className="mt-5 font-body text-lg font-semibold tracking-[-0.01em] text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              <a
                href={buildWhatsAppUrl(service.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.services.ctaLabel} ${service.title}`}
                className="mt-2 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-accent transition-colors group-hover:text-foreground"
              >
                {t.services.ctaLabel}
                <span aria-hidden>&rarr;</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-6 overflow-hidden scrollbar-hide sm:mt-14" aria-hidden>
          <div className="flex w-max animate-marquee gap-12 text-sm font-medium uppercase tracking-[0.35em] text-muted-foreground/40 sm:text-base">
            {[...t.services.items, ...t.services.items].map((service, i) => (
              <span key={`${service.title}-${i}`}>{service.title} &bull;</span>
            ))}
          </div>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
