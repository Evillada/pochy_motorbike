import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Wallet, MapPin, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/useLanguage';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MotionRoot } from '@/components/ui/MotionRoot';

// Order matches translations.ts whyUs.points: personalized attention, quality
// parts, Addi financing, Medellín location.
const POINT_ICONS: LucideIcon[] = [Handshake, ShieldCheck, Wallet, MapPin];

export default function WhyUsClient() {
  const { t } = useLanguage();

  return (
    <MotionRoot>
    <section id="why-us" className="relative scroll-mt-24 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="02" eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} align="center" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.points.map((point, i) => {
            const Icon = POINT_ICONS[i] ?? Handshake;
            return (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="card-surface p-8 text-center"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent-strong text-primary-foreground">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-body text-lg font-bold tracking-tight">{point.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
    </MotionRoot>
  );
}
