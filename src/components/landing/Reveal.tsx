import type { ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';

type RevealVariant = 'fade-up' | 'fade-in' | 'scale-in';

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}

const HIDDEN: Record<RevealVariant, string> = {
  'fade-up': 'opacity-0 translate-y-6',
  'fade-in': 'opacity-0',
  'scale-in': 'opacity-0 scale-95',
};

/** Wraps children in a fade/slide/scale reveal that triggers once the
 * element scrolls into view. Global CSS already zeroes transition
 * durations under prefers-reduced-motion, so this degrades to an
 * instant, non-distracting appearance for those users automatically. */
export default function Reveal({ children, variant = 'fade-up', delay = 0, className = '' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0 scale-100' : HIDDEN[variant]} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}