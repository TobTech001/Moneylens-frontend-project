import type { InputHTMLAttributes, ReactNode } from 'react';
import { IconCheck } from '../Icons';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  error?: string;
}

export default function Checkbox({ label, id, error, className = '', ...rest }: CheckboxProps) {
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-2.5 select-none">
        <span className="relative mt-0.5 shrink-0">
          <input type="checkbox" id={id} className="peer sr-only" {...rest} />
          <span className="grid h-4.5 w-4.5 place-items-center rounded border border-line bg-surface-alt transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary/30">
            <IconCheck className="h-3 w-3 text-bg opacity-0 peer-checked:opacity-100" />
          </span>
        </span>
        <span className={`text-sm leading-snug text-slate ${className}`}>{label}</span>
      </label>
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  );
}