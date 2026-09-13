import Container from './Container';
import { IconAlert, IconTarget } from '../Icons';

const INSIGHTS = [
  {
    icon: '🍔',
    label: 'Food spending',
    value: '₦47,500',
    detail: 'spent on food this month',
    accent: 'primary' as const,
  },
  {
    icon: IconAlert,
    label: 'Spending increase',
    value: '+32%',
    detail: 'compared to last month',
    accent: 'warning' as const,
  },
  {
    icon: '🚗',
    label: 'Transport',
    value: '2nd',
    detail: 'highest spending category',
    accent: 'accent' as const,
  },
  {
    icon: IconTarget,
    label: 'Budget warning',
    value: '91%',
    detail: 'of your food budget used',
    accent: 'warning' as const,
  },
];

const TREND = [30, 45, 38, 55, 42, 60, 52, 70, 48, 62, 44, 68];

const accentClasses = {
  primary: 'border-primary/25 bg-primary-tint text-primary',
  warning: 'border-warning/25 bg-warning/10 text-warning',
  accent: 'border-accent/25 bg-accent-tint text-accent',
};

export default function FinancialInsights() {
  return (
    <section id="insights" className="py-20 sm:py-28">
      <Container>
        <h2 className="max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Your money has a story. MoneyLens helps you read it.
        </h2>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-4">
            {INSIGHTS.map((insight, i) => (
              <div
                key={insight.label}
                className={`rounded-2xl border border-line bg-surface p-5 ${i % 3 === 1 ? 'lg:translate-y-6' : ''}`}
              >
                <span className={`grid h-9 w-9 place-items-center rounded-lg border text-sm ${accentClasses[insight.accent]}`}>
                  {typeof insight.icon === 'string' ? insight.icon : <insight.icon className="h-4 w-4" />}
                </span>
                <p className="mt-3 font-display text-2xl font-semibold text-ink">{insight.value}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate">{insight.detail}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate">Spending trend</p>
                <p className="font-display text-2xl font-semibold text-ink">₦120,000</p>
              </div>
              <span className="rounded-full border border-warning/25 bg-warning/10 px-2.5 py-1 text-xs font-medium text-warning">
                +32%
              </span>
            </div>

            <svg viewBox="0 0 300 100" className="mt-6 h-32 w-full overflow-visible" preserveAspectRatio="none">
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                fill="url(#trendFill)"
                points={`0,100 ${TREND.map((v, i) => `${(i / (TREND.length - 1)) * 300},${100 - v}`).join(' ')} 300,100`}
              />
              <polyline
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={TREND.map((v, i) => `${(i / (TREND.length - 1)) * 300},${100 - v}`).join(' ')}
              />
            </svg>

            <div className="mt-4 flex justify-between text-[11px] text-mist">
              <span>Jan</span>
              <span>Apr</span>
              <span>Jul</span>
              <span>Oct</span>
              <span>Dec</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}