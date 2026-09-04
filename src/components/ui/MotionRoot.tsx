import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';

interface MotionRootProps {
  children: ReactNode;
}

/**
 * Wraps one island's content so every Framer Motion animation inside it
 * respects the OS-level "reduce motion" preference. `reducedMotion="user"`
 * disables transform/layout animation (scale, slide, rotate) while leaving
 * opacity fades intact, matching the Global Constraints' reduced-motion
 * requirement without touching each animated component individually.
 */
export function MotionRoot({ children }: MotionRootProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
