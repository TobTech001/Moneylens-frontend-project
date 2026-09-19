import Select from '../common/Select';
import Button from '../common/Button';
import { IconSearch } from '../Icons';
import { TRANSACTION_CATEGORIES } from '../../types/transaction';
import type { DateFilter, TypeFilter } from '../../pages/user/Transactions';

const CATEGORY_OPTIONS = [{ label: 'All Categories', value: 'all' }, ...TRANSACTION_CATEGORIES.map((c) => ({ label: c, value: c }))];

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Income', value: 'income' },
  { label: 'Expense', value: 'expense' },
];

const DATE_OPTIONS: { label: string; value: DateFilter }[] = [
  { label: 'All Time', value: 'all' },
  { label: 'Today', value: 'today' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Custom Date', value: 'custom' },
];

interface TransactionToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  type: TypeFilter;
  onTypeChange: (value: TypeFilter) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (value: DateFilter) => void;
  customDate: string;
  onCustomDateChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function TransactionToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  type,
  onTypeChange,
  dateFilter,
  onDateFilterChange,
  customDate,
  onCustomDateChange,
  hasActiveFilters,
  onClearFilters,
}: TransactionToolbarProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="relative">
        <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search transactions..."
          aria-label="Search transactions"
          className="w-full rounded-lg border border-line bg-surface-alt py-3 pl-11 pr-3.5 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Category" value={category} onChange={(e) => onCategoryChange(e.target.value)} options={CATEGORY_OPTIONS} />
        <Select
          label="Type"
          value={type}
          onChange={(e) => onTypeChange(e.target.value as TypeFilter)}
          options={TYPE_OPTIONS}
        />
        <Select
          label="Date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value as DateFilter)}
          options={DATE_OPTIONS}
        />
        {dateFilter === 'custom' ? (
          <div className="w-full">
            <label htmlFor="custom-date" className="mb-1.5 block text-sm font-medium text-ink">
              Pick a date
            </label>
            <input
              id="custom-date"
              type="date"
              value={customDate}
              onChange={(e) => onCustomDateChange(e.target.value)}
              className="w-full rounded-lg border border-line bg-surface-alt py-3 px-3.5 text-sm text-ink transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        ) : (
          <div className="flex items-end">
            {hasActiveFilters && (
              <Button type="button" variant="ghost" onClick={onClearFilters} className="px-2 py-3">
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>

      {dateFilter === 'custom' && hasActiveFilters && (
        <div className="mt-3">
          <Button type="button" variant="ghost" onClick={onClearFilters} className="px-0 py-0">
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}