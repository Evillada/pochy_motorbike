import { motion } from 'framer-motion';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildMapsSearchUrl } from '@/lib/maps';

// TODO(pochy): confirm real hours and exact address before launch.
const MAPS_QUERY = 'Pochy MotorBike Medellín';

export default function LocationHoursClient() {
  const { t } = useLanguage();
  const mapsHref = buildMapsSearchUrl(MAPS_QUERY);

  return (
    <MotionRoot>
    <section id="location" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="03" eyebrow={t.location.eyebrow} title={t.location.title} />

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="card-surface p-8"
          >
            <p className="font-body text-xl font-bold tracking-tight">{t.location.citySummary}</p>
            <a
              href={mapsHref}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-primary"
            >
              {t.location.mapCtaLabel}
              <span aria-hidden>&rarr;</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: -6 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="card-surface p-8"
          >
            <p className="font-body text-xl font-bold tracking-tight">{t.location.hoursTitle}</p>
            <dl className="mt-4 space-y-2">
              {t.location.hours.map((row) => (
                <div key={row.label} className="flex items-center justify-between text-sm">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
