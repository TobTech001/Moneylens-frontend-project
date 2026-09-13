import type { OverviewStat } from '../../types/Dashboard';
import Card from '../common/Card';

const CHANGE_COLOR: Record<NonNullable<OverviewStat['changeType']>, string> = {
  positive: 'text-primary',
  negative: 'text-warning',
  neutral: 'text-slate',
};

export default function OverviewCard({ stat }: { stat: OverviewStat }) {
  return (
    <Card className="transition-colors hover:border-line-soft">
      <p className="text-sm text-slate">{stat.label}</p>
      <p className="mt-2 font-display text-2xl font-semibold text-ink sm:text-[1.7rem]">{stat.value}</p>
      {stat.change && (
        <p className={`mt-1.5 text-xs font-medium ${CHANGE_COLOR[stat.changeType ?? 'neutral']}`}>{stat.change}</p>
      )}
      {stat.helper && <p className="mt-1.5 text-xs text-mist">{stat.helper}</p>}
    </Card>
  );
}