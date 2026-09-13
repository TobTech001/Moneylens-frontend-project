import OverviewCard from './OverviewCard';
import { OVERVIEW_STATS } from '../../data/DashboardData';

export default function FinancialOverview() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {OVERVIEW_STATS.map((stat) => (
        <OverviewCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}