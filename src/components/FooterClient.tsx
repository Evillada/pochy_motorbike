import { useLanguage } from '@/i18n/useLanguage';
import { MotoGlyph } from '@/components/ui/MotoGlyph';
import { MotionRoot } from '@/components/ui/MotionRoot';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

const INSTAGRAM_URL = 'https://www.instagram.com/pochy_motorbike/';

export default function FooterClient() {
  const { t } = useLanguage();
  const whatsappHref = buildWhatsAppUrl(t.hero.whatsappMessage);
  const year = new Date().getFullYear();

  return (
    <MotionRoot>
    <footer id="contact" className="border-t border-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <MotoGlyph className="h-12 w-12" />
        <p className="max-w-sm text-sm text-muted-foreground">{t.footer.tagline}</p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-accent hover:text-primary">
            {t.footer.instagramLabel}
          </a>
          <a href={whatsappHref} className="text-accent hover:text-primary">
            {t.footer.whatsappLabel}
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; {year} Pochy MotorBike. {t.footer.rights}
        </p>
      </div>
    </footer>
    </MotionRoot>
  );
}
