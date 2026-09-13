import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  message: string;
  action?: ReactNode;
}

export default function EmptyState({ icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line px-6 py-10 text-center">
      {icon && <div className="mb-3 text-2xl">{icon}</div>}
      <p className="text-sm font-medium text-ink">{title}</p>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-slate">{message}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}