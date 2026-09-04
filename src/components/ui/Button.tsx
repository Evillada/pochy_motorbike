import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_45%,transparent)]',
  ghost: 'bg-transparent text-foreground border border-border hover:border-primary',
};

const MotionAnchor = motion.a;
const MotionButton = motion.button;

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;

  const sharedClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3',
    'font-display text-base font-semibold tracking-wide',
    'transition-shadow duration-300',
    variantClasses[variant],
    className,
  );

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: 'spring', stiffness: 400, damping: 22 },
  } as const;

  if (props.as === 'a') {
    const { as: _as, href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      as?: string;
      href: string;
    };
    return (
      <MotionAnchor href={href} className={sharedClassName} {...motionProps} {...anchorRest}>
        {children}
      </MotionAnchor>
    );
  }

  const { as: _as, ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: string;
  };
  return (
    <MotionButton type="button" className={sharedClassName} {...motionProps} {...buttonRest}>
      {children}
    </MotionButton>
  );
}
