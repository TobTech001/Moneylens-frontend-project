import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export default function Card({ children, padded = true, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-line bg-surface ${padded ? 'p-5 sm:p-6' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}