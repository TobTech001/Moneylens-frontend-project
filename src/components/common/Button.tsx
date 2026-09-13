import type { ButtonHTMLAttributes, ReactNode } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  loadingText?: string;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-bg hover:bg-primary-hover shadow-[0_0_24px_-8px_var(--color-primary)] disabled:shadow-none',
  secondary: 'border border-line bg-surface text-ink hover:border-primary/40 hover:bg-surface-alt',
  ghost: 'text-slate hover:text-ink',
};

export default function Button({
  variant = 'primary',
  isLoading = false,
  loadingText,
  fullWidth = false,
  disabled,
  children,
  className = '',
  ...rest
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        VARIANT_CLASSES[variant]
      } ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {isLoading && <LoadingSpinner className="h-4 w-4" />}
      {isLoading && loadingText ? loadingText : children}
    </button>
  );
}