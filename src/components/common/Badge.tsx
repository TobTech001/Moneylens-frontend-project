import type { ReactNode } from 'react';

type BadgeTone = 'positive' | 'negative' | 'warning' | 'info' | 'neutral';

const TONE_CLASSES: Record<BadgeTone, string> = {
  positive: 'border-primary/25 bg-primary-tint text-primary',
  negative: 'border-danger/25 bg-danger/10 text-danger',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  info: 'border-accent/25 bg-accent-tint text-accent',
  neutral: 'border-line bg-surface-alt text-slate',
};

export default function Badge({ tone = 'neutral', children }: { tone?: BadgeTone; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${TONE_CLASSES[tone]}`}>
      {children}
    </span>
  );
}