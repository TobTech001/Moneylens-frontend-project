import type { Insight, InsightType } from '../../types/Dashboard';

const TYPE_STYLES: Record<InsightType, string> = {
  alert: 'border-warning/25 bg-warning/10',
  opportunity: 'border-accent/25 bg-accent-tint',
  budget: 'border-danger/25 bg-danger/10',
};

const TYPE_TEXT: Record<InsightType, string> = {
  alert: 'text-warning',
  opportunity: 'text-accent',
  budget: 'text-danger',
};

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className={`rounded-xl border p-4 ${TYPE_STYLES[insight.type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none">{insight.icon}</span>
        <div className="min-w-0 flex-1">
          <p className={`text-xs font-semibold uppercase tracking-wide ${TYPE_TEXT[insight.type]}`}>{insight.title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-ink">{insight.message}</p>
          {insight.actionLabel && (
            <button
              type="button"
              className={`mt-2.5 text-xs font-medium transition-colors hover:opacity-80 ${TYPE_TEXT[insight.type]}`}
            >
              {insight.actionLabel} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}