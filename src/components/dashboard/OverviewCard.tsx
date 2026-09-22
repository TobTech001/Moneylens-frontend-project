import type { OverviewStat } from '../../types/Dashboard';
import Card from '../common/Card';
import Counter from '../common/Counter';

const CHANGE_COLOR: Record<NonNullable<OverviewStat['changeType']>, string> = {
  positive: 'text-primary',
  negative: 'text-warning',
  neutral: 'text-slate',
};

export default function OverviewCard({ stat }: { stat: OverviewStat }) {
  return (
    <Card className="transition-all duration-300 hover:-translate-y-0.5 hover:border-line-soft hover:shadow-[0_20px_40px_-25px_rgba(0,0,0,0.6)]">
      <p className="text-sm text-slate">{stat.label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-ink sm:text-[1.7rem]">
        {'numericValue' in stat && typeof stat.numericValue === 'number' ? (
          <Counter target={stat.numericValue} prefix="₦" />
        ) : (
          stat.value
        )}
      </p>
      {stat.change && (
        <p className={`mt-1.5 text-xs font-medium ${CHANGE_COLOR[stat.changeType ?? 'neutral']}`}>{stat.change}</p>
      )}
      {stat.helper && <p className="mt-1.5 text-xs text-mist">{stat.helper}</p>}
    </Card>
  );
}