import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, rightElement, error, hint, id, className = '', ...rest }, ref) => {
    return (
      <div className="w-full">
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
          {label}
        </label>
        <div className="relative">
          {icon && <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-mist">{icon}</span>}
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            className={`w-full rounded-lg border bg-surface-alt py-3 text-sm text-ink placeholder:text-mist transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 ${
              icon ? 'pl-11' : 'pl-3.5'
            } ${rightElement ? 'pr-11' : 'pr-3.5'} ${
              error ? 'border-danger focus:border-danger' : 'border-line focus:border-primary'
            } ${className}`}
            {...rest}
          />
          {rightElement && <span className="absolute right-2.5 top-1/2 -translate-y-1/2">{rightElement}</span>}
        </div>
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-xs text-danger">
            {error}
          </p>
        ) : hint ? (
          <p id={`${id}-hint`} className="mt-1.5 text-xs text-mist">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
export default Input;