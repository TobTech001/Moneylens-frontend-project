export type BorrowLendTab = 'all' | 'lent' | 'borrowed' | 'outstanding' | 'completed';

const TABS: { label: string; value: BorrowLendTab }[] = [
  { label: 'All', value: 'all' },
  { label: 'Money Lent', value: 'lent' },
  { label: 'Money Borrowed', value: 'borrowed' },
  { label: 'Outstanding', value: 'outstanding' },
  { label: 'Completed', value: 'completed' },
];

interface BorrowLendTabsProps {
  active: BorrowLendTab;
  onChange: (tab: BorrowLendTab) => void;
}

export default function BorrowLendTabs({ active, onChange }: BorrowLendTabsProps) {
  return (
    <div role="tablist" aria-label="Borrow and lend filter" className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-surface p-1">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => onChange(tab.value)}
          className={`shrink-0 rounded-md px-3.5 py-2 text-sm font-medium transition-colors ${
            active === tab.value ? 'bg-primary-tint text-primary' : 'text-slate hover:text-ink'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}