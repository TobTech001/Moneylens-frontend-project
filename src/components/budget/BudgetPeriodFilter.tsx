import Select from '../common/Select';
import { PERIOD_FILTER_LABELS, type BudgetPeriodFilter as PeriodValue } from '../../data/BudgetData';

const OPTIONS = (Object.keys(PERIOD_FILTER_LABELS) as PeriodValue[]).map((value) => ({
  label: PERIOD_FILTER_LABELS[value],
  value,
}));

interface BudgetPeriodFilterProps {
  value: PeriodValue;
  onChange: (value: PeriodValue) => void;
}

export default function BudgetPeriodFilter({ value, onChange }: BudgetPeriodFilterProps) {
  return (
    <div className="w-full sm:w-48">
      <Select aria-label="Budget period" value={value} onChange={(e) => onChange(e.target.value as PeriodValue)} options={OPTIONS} />
    </div>
  );
}