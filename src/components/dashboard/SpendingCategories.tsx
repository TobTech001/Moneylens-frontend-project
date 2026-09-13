import Card from '../common/Card';
import { TOP_CATEGORIES } from '../../data/DashboardData';

const SEGMENT_COLORS = ['var(--color-primary)', 'var(--color-accent-2)', 'var(--color-accent)', 'var(--color-warning)'];

const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function SpendingCategories() {
  let cumulativeOffset = 0;

  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">Your Top Spending Categories</h2>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center">
        <svg viewBox="0 0 100 100" className="h-36 w-36 shrink-0 -rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-surface-alt)" strokeWidth="14" />
          {TOP_CATEGORIES.map((c, i) => {
            const dash = (c.percent / 100) * CIRCUMFERENCE;
            const circle = (
              <circle
                key={c.category}
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke={SEGMENT_COLORS[i % SEGMENT_COLORS.length]}
                strokeWidth="14"
                strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                strokeDashoffset={-cumulativeOffset}
                strokeLinecap="butt"
              />
            );
            cumulativeOffset += dash;
            return circle;
          })}
        </svg>

        <div className="w-full flex-1 space-y-3">
          {TOP_CATEGORIES.map((c, i) => (
            <div key={c.category} className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }}
              />
              <span className="text-sm text-ink">
                {c.icon} {c.category}
              </span>
              <span className="ml-auto text-sm text-slate">{formatNaira(c.amount)}</span>
              <span className="w-10 shrink-0 text-right text-xs text-mist">{c.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}