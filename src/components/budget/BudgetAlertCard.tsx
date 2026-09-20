import { Link } from 'react-router-dom';
import type { BudgetAlert, BudgetAlertType } from '../../types/budget';

const TYPE_STYLES: Record<BudgetAlertType, string> = {
  warning: 'border-warning/25 bg-warning/10',
  danger: 'border-danger/25 bg-danger/10',
  info: 'border-primary/25 bg-primary-tint',
};

const TYPE_ICON: Record<BudgetAlertType, string> = {
  warning: '⚠️',
  danger: '🚨',
  info: '✅',
};

const TYPE_TEXT: Record<BudgetAlertType, string> = {
  warning: 'text-warning',
  danger: 'text-danger',
  info: 'text-primary',
};

export default function BudgetAlertCard({ alert }: { alert: BudgetAlert }) {
  return (
    <div className={`rounded-xl border p-4 ${TYPE_STYLES[alert.type]}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg leading-none">{TYPE_ICON[alert.type]}</span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-ink">{alert.title}</p>
          <p className="mt-1 text-sm leading-relaxed text-slate">{alert.message}</p>
          <Link to="/budget" className={`mt-2.5 inline-block text-xs font-medium transition-colors hover:opacity-80 ${TYPE_TEXT[alert.type]}`}>
            {alert.actionLabel} →
          </Link>
        </div>
      </div>
    </div>
  );
}