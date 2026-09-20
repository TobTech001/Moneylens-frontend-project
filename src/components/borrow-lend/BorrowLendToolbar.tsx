import Select from '../common/Select';
import Button from '../common/Button';
import { IconSearch } from '../Icons';
import type { BorrowLendStatus, BorrowLendType } from '../../types/borrowLend';

export type StatusFilter = 'all' | BorrowLendStatus;
export type TypeFilter = 'all' | BorrowLendType;
export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'lastMonth' | 'custom';

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Outstanding', value: 'outstanding' },
  { label: 'Partially Paid', value: 'partially-paid' },
  { label: 'Paid', value: 'paid' },
  { label: 'Overdue', value: 'overdue' },
];

const TYPE_OPTIONS: { label: string; value: TypeFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Lent', value: 'lent' },
  { label: 'Borrowed', value: 'borrowed' },
];

const DATE_OPTIONS: { label: string; value: DateFilter }[] = [
  { label: 'All Time', value: 'all' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' },
  { label: 'Last Month', value: 'lastMonth' },
  { label: 'Custom Date', value: 'custom' },
];

interface BorrowLendToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  type: TypeFilter;
  onTypeChange: (v: TypeFilter) => void;
  dateFilter: DateFilter;
  onDateFilterChange: (v: DateFilter) => void;
  customDate: string;
  onCustomDateChange: (v: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function BorrowLendToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  type,
  onTypeChange,
  dateFilter,
  onDateFilterChange,
  customDate,
  onCustomDateChange,
  hasActiveFilters,
  onClearFilters,
}: BorrowLendToolbarProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="relative">
        <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by person or description..."
          aria-label="Search records"
          className="w-full rounded-lg border border-line bg-surface-alt py-3 pl-11 pr-3.5 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Status" value={status} onChange={(e) => onStatusChange(e.target.value as StatusFilter)} options={STATUS_OPTIONS} />
        <Select label="Type" value={type} onChange={(e) => onTypeChange(e.target.value as TypeFilter)} options={TYPE_OPTIONS} />
        <Select
          label="Date"
          value={dateFilter}
          onChange={(e) => onDateFilterChange(e.target.value as DateFilter)}
          options={DATE_OPTIONS}
        />
        {dateFilter === 'custom' ? (
          <div className="w-full">
            <label htmlFor="bl-custom-date" className="mb-1.5 block text-sm font-medium text-ink">
              Pick a date
            </label>
            <input
              id="bl-custom-date"
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