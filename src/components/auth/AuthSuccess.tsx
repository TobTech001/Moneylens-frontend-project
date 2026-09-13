import type { ReactNode } from 'react';
import Button from '../common/Button';

interface AuthSuccessProps {
  icon: ReactNode;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondary?: ReactNode;
}

export default function AuthSuccess({ icon, title, message, primaryLabel, onPrimary, secondary }: AuthSuccessProps) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out] text-center">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-primary/25 bg-primary-tint text-2xl">
        {icon}
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
      <p className="mx-auto mt-2.5 max-w-xs text-sm leading-relaxed text-slate">{message}</p>

      <Button type="button" fullWidth onClick={onPrimary} className="mt-7">
        {primaryLabel}
      </Button>

      {secondary && <div className="mt-4 text-sm text-slate">{secondary}</div>}
    </div>
  );
}