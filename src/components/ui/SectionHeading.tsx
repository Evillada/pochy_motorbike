interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`reveal ${align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'}`}>
      <span className="text-xs font-medium uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
      <h2 className="mt-4 font-body text-[2rem] sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-5 text-base sm:text-lg text-muted-foreground max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
