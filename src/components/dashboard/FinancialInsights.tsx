import Card from '../common/Card';
import InsightCard from './InsightCard';
import { INSIGHTS } from '../../data/DashboardData';

export default function FinancialInsights() {
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">💡 MoneyLens Insights</h2>
      <div className="mt-5 space-y-3">
        {INSIGHTS.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </Card>
  );
}