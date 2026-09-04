import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { ServiceIcon, type ServiceIconKind } from '@/components/ui/ServiceIcon';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// Order matches translations.ts services.items: general maintenance, oil
// change, brakes, electrical diagnostics, spare parts.
const SERVICE_ICONS: ServiceIconKind[] = ['maintenance', 'oil', 'brakes', 'electrical', 'parts'];

export default function ServicesClient() {
  const { t } = useLanguage();

  return (
    <MotionRoot>
    <section id="services" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          eyebrow={t.services.eyebrow}
          title={t.services.title}
          subtitle={t.services.subtitle}
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.items.map((service, i) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
              className="card-surface group relative overflow-hidden p-7"
            >
              <div className="flex items-center justify-between">
                <ServiceIcon kind={SERVICE_ICONS[i] ?? 'maintenance'} className="h-12 w-12" />
                <span className="font-display text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold text-card-foreground">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
              <a
                href={buildWhatsAppUrl(service.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                aria-label={`${t.services.ctaLabel} ${service.title}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-colors group-hover:text-primary"
              >
                {t.services.ctaLabel}
                <span aria-hidden>&rarr;</span>
              </a>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 overflow-hidden scrollbar-hide" aria-hidden>
          <div className="flex w-max animate-marquee gap-10 text-2xl font-display font-bold uppercase tracking-widest text-muted-foreground/40">
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
