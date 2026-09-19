import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import AnalyticsDateFilter from '../../components/analytics/AnalyticsDateFilter';
import AnalyticsSummary from '../../components/analytics/AnalyticsSummary';
import SpendingTrend from '../../components/analytics/SpendingTrend';
import CategoryBreakdown from '../../components/analytics/CategoryBreakdown';
import CategoryDetails from '../../components/analytics/CategoryDetails';
import MonthlyComparison from '../../components/analytics/MonthlyComparison';
import SpendingInsights from '../../components/analytics/SpendingInsights';
import TopMerchants from '../../components/analytics/TopMerchants';
import DailySpending from '../../components/analytics/DailySpending';
import SpendingHighlights from '../../components/analytics/SpendingHighlights';
import { getAnalyticsDataset, MONTHLY_COMPARISON } from '../../data/AnalyticsData';
import type { AnalyticsPeriod } from '../../types/analytics';

// Frontend-only — set to true to preview the "no transactions yet" empty state.
const HAS_TRANSACTIONS = true;

export default function Analytics() {
  const [period, setPeriod] = useState<AnalyticsPeriod>('month');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  function load() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch keyed off the selected period.
    setTimeout(() => setIsLoading(false), 700);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const dataset = getAnalyticsDataset(period);

  if (!HAS_TRANSACTIONS) {
    return (
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-semibold text-ink">Analytics</h1>
        <EmptyState
          icon="📊"
          title="No analytics available yet"
          message="Add some transactions to start seeing insights about your spending."
          action={
            <Link to="/transactions">
              <Button type="button">Add Transaction</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Analytics</h1>
          <p className="mt-1 text-sm text-slate">Understand where your money is going and discover spending patterns.</p>
        </div>
        <AnalyticsDateFilter value={period} onChange={setPeriod} />
      </div>

      {hasError ? (
        <ErrorState message="We couldn't load your financial analytics." onRetry={load} />
      ) : (
        <>
          <AnalyticsSummary summary={dataset.summary} isLoading={isLoading} />

          <SpendingTrend trend={dataset.trend} isLoading={isLoading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <CategoryBreakdown categories={dataset.categories} isLoading={isLoading} />
            <CategoryDetails categories={dataset.categories} isLoading={isLoading} />
          </div>

          <MonthlyComparison rows={MONTHLY_COMPARISON} isLoading={isLoading} />

          <SpendingInsights dataset={dataset} isLoading={isLoading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <TopMerchants merchants={dataset.merchants} isLoading={isLoading} />
            <DailySpending data={dataset.dailySpending} isLoading={isLoading} />
          </div>

          <SpendingHighlights data={dataset.dailySpending} isLoading={isLoading} />
        </>
      )}
    </div>
  );
}