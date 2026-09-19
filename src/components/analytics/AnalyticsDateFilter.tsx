import Select from '../common/Select';
import { PERIOD_LABELS } from '../../data/AnalyticsData';
import type { AnalyticsPeriod } from '../../types/analytics';

const OPTIONS = (Object.keys(PERIOD_LABELS) as AnalyticsPeriod[]).map((value) => ({
  label: PERIOD_LABELS[value],
  value,
}));

interface AnalyticsDateFilterProps {
  value: AnalyticsPeriod;
  onChange: (value: AnalyticsPeriod) => void;
}

export default function AnalyticsDateFilter({ value, onChange }: AnalyticsDateFilterProps) {
  return (
    <div className="w-full sm:w-48">
      <Select
        aria-label="Analytics period"
        value={value}
        onChange={(e) => onChange(e.target.value as AnalyticsPeriod)}
        options={OPTIONS}
      />
    </div>
  );
}