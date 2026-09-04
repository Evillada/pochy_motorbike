interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ index, eyebrow, title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'}>
      <div className="flex items-baseline gap-3">
        <span className="font-display text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          {index}
        </span>
        <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{eyebrow}</span>
      </div>
      <h2 className="mt-3 font-body text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground">
        {title}
      </h2>
      {subtitle ? (
        <p className={`mt-4 text-lg text-muted-foreground max-w-xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
