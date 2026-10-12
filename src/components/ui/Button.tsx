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
  primary:
    'relative overflow-hidden bg-primary text-primary-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_0_0_1px_rgba(255,255,255,0.06),0_12px_32px_-14px_color-mix(in_oklch,var(--primary)_70%,transparent)]',
  ghost:
    'bg-white/[0.06] text-foreground shadow-[0_0_0_1px_var(--border)] backdrop-blur-md hover:bg-white/[0.1] hover:shadow-[0_0_0_1px_color-mix(in_oklch,var(--accent)_45%,transparent)]',
};

const MotionAnchor = motion.a;
const MotionButton = motion.button;

export function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, ...rest } = props;

  const sharedClassName = cn(
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5',
    'font-body text-base font-medium tracking-[-0.01em]',
    'transition-[background-color,box-shadow] duration-300',
    variantClasses[variant],
    className,
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { type: 'spring', stiffness: 380, damping: 24 },
  } as const;

  if (props.as === 'a') {
    const { as: _as, href, ...anchorRest } = rest as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, MotionConflictingProps> & {
      as?: string;
      href: string;
    };
    return (
      <MotionAnchor href={href} className={sharedClassName} {...motionProps} {...anchorRest}>
        {variant === 'primary' && <span aria-hidden className="btn-shine" />}
        <span className="relative">{children}</span>
      </MotionAnchor>
    );
  }

  const { as: _as, ...buttonRest } = rest as Omit<ButtonHTMLAttributes<HTMLButtonElement>, MotionConflictingProps> & {
    as?: string;
  };
  return (
    <MotionButton type="button" className={sharedClassName} {...motionProps} {...buttonRest}>
      {variant === 'primary' && <span aria-hidden className="btn-shine" />}
      <span className="relative">{children}</span>
    </MotionButton>
  );
}
