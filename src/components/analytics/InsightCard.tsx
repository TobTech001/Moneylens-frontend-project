import { Link } from 'react-router-dom';
import type { AnalyticsInsight, InsightType } from '../../types/analytics';

const TYPE_STYLES: Record<InsightType, string> = {
  alert: 'border-warning/25 bg-warning/10',
  info: 'border-accent/25 bg-accent-tint',
  opportunity: 'border-primary/25 bg-primary-tint',
  subscription: 'border-line bg-surface-alt',
};

const TYPE_ICON: Record<InsightType, string> = {
  alert: '⚠️',
  info: '📊',
  opportunity: '💡',
  subscription: '🔔',
};

const TYPE_TEXT: Record<InsightType, string> = {
  alert: 'text-warning',
  info: 'text-accent',
  opportunity: 'text-primary',
  subscription: 'text-ink',
};

export default function InsightCard({ insight }: { insight: AnalyticsInsight }) {
  return (
    <div className={`rounded-xl border p-4 ${TYPE_STYLES[insight.type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none">{TYPE_ICON[insight.type]}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">{insight.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate">{insight.description}</p>
          {insight.actionLabel && insight.actionHref && (
            <Link
              to={insight.actionHref}
              className={`mt-2.5 inline-block text-xs font-medium transition-colors hover:opacity-80 ${TYPE_TEXT[insight.type]}`}
            >
              {insight.actionLabel} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}