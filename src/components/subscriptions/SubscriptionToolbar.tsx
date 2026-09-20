import Select from '../common/Select';
import Button from '../common/Button';
import { IconSearch } from '../Icons';
import { SUBSCRIPTION_CATEGORIES, type SubscriptionFrequency, type SubscriptionStatus } from '../../types/subscription';

export type StatusFilter = 'all' | SubscriptionStatus;
export type CategoryFilter = 'all' | (typeof SUBSCRIPTION_CATEGORIES)[number];
export type FrequencyFilter = 'all' | SubscriptionFrequency;

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Payment Failed', value: 'payment-failed' },
];

const CATEGORY_OPTIONS: { label: string; value: CategoryFilter }[] = [
  { label: 'All Categories', value: 'all' },
  ...SUBSCRIPTION_CATEGORIES.map((c) => ({ label: c, value: c })),
];

const FREQUENCY_OPTIONS: { label: string; value: FrequencyFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Yearly', value: 'yearly' },
];

interface SubscriptionToolbarProps {
  search: string;
  onSearchChange: (v: string) => void;
  status: StatusFilter;
  onStatusChange: (v: StatusFilter) => void;
  category: CategoryFilter;
  onCategoryChange: (v: CategoryFilter) => void;
  frequency: FrequencyFilter;
  onFrequencyChange: (v: FrequencyFilter) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export default function SubscriptionToolbar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  category,
  onCategoryChange,
  frequency,
  onFrequencyChange,
  hasActiveFilters,
  onClearFilters,
}: SubscriptionToolbarProps) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="relative">
        <IconSearch className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-mist" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search subscriptions..."
          aria-label="Search subscriptions"
          className="w-full rounded-lg border border-line bg-surface-alt py-3 pl-11 pr-3.5 text-sm text-ink placeholder:text-mist transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Select label="Status" value={status} onChange={(e) => onStatusChange(e.target.value as StatusFilter)} options={STATUS_OPTIONS} />
        <Select label="Category" value={category} onChange={(e) => onCategoryChange(e.target.value as CategoryFilter)} options={CATEGORY_OPTIONS} />
        <Select label="Frequency" value={frequency} onChange={(e) => onFrequencyChange(e.target.value as FrequencyFilter)} options={FREQUENCY_OPTIONS} />
        <div className="flex items-end">
          {hasActiveFilters && (
            <Button type="button" variant="ghost" onClick={onClearFilters} className="px-2 py-3">
              Clear Filters
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}