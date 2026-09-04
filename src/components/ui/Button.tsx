import { motion } from 'framer-motion';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Framer Motion's motion.button/motion.a redefine these DOM event handlers
// with incompatible signatures (e.g. onAnimationStart takes a Framer
// AnimationDefinition, not a DOM AnimationEvent). Omitting them from the
// native attribute types below keeps the two APIs from colliding — Button
// never needs to expose them, since nothing in this project passes
// onAnimationStart/onDrag* to a Button.
type MotionConflictingProps =
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd';

type Variant = 'primary' | 'ghost';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & { as?: 'button' };

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & { as: 'a'; href: string };

export type ButtonProps = ButtonAsButton | ButtonAsAnchor;

const variantClasses: Record<Variant, string> = {
  // Uses --accent-strong (not --accent) at the gradient's accent end: at
  // WCAG AA, text-primary-foreground must clear 4.5:1 against BOTH ends,
  // and plain --accent only manages 2.44:1 there (see globals.css).
  primary:
    'bg-gradient-to-r from-primary to-accent-strong text-primary-foreground shadow-[0_8px_24px_color-mix(in_oklch,var(--primary)_45%,transparent)]',
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
    const { as: _as, href, ...anchorRest } = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & {
      as?: string;
      href: string;
    };
    return (
      <MotionAnchor href={href} className={sharedClassName} {...motionProps} {...anchorRest}>
        {children}
      </MotionAnchor>
    );
  }

  const { as: _as, ...buttonRest } = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & {
    as?: string;
  };
  return (
    <MotionButton type="button" className={sharedClassName} {...motionProps} {...buttonRest}>
      {children}
    </MotionButton>
  );
}
