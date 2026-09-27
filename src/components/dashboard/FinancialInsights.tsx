import Card from '../common/Card';

interface InsightTile {
  id: string;
  icon: string;
  label: string;
  amount: number;
  note: string;
  tone: 'warning' | 'accent' | 'primary';
}

// Frontend-only mock data — swap for real computed values once transactions
// and subscriptions are wired to a backend.
const HEADLINE = "Your food spending increased by 18% this month.";

const TILES: InsightTile[] = [
  { id: 'food', icon: '🍔', label: 'Food Spending', amount: 47500, note: '+32% from last month', tone: 'warning' },
  { id: 'transport', icon: '🚗', label: 'Transport', amount: 25000, note: 'Your second highest category', tone: 'accent' },
  { id: 'subscriptions', icon: '📺', label: 'Subscriptions', amount: 18500, note: '6 active subscriptions', tone: 'primary' },
];

const TONE_ICON_BOX: Record<InsightTile['tone'], string> = {
  warning: 'border-warning/25 bg-warning/10',
  accent: 'border-accent/25 bg-accent-tint',
  primary: 'border-primary/25 bg-primary-tint',
};

const TONE_NOTE_TEXT: Record<InsightTile['tone'], string> = {
  warning: 'text-warning',
  accent: 'text-accent',
  primary: 'text-primary',
};

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

export default function FinancialInsights() {
  return (
    <Card>
      <h2 className="font-display text-lg font-semibold text-ink">💡 MoneyLens Insights</h2>

      {/* Headline banner — wraps naturally, never forces a fixed width */}
      <div className="mt-4 rounded-xl border border-warning/25 bg-warning/10 px-4 py-3">
        <p className="text-sm font-medium leading-relaxed text-warning">{HEADLINE}</p>
      </div>

      {/* Tiles — 1 column on narrow/mobile, 2 on small screens, 3 only once
          there's genuinely enough room. Each tile can shrink to ~140px
          without clipping: text wraps instead of being cut off, and nothing
          uses whitespace-nowrap on the amount or note. */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((tile) => (
          <div key={tile.id} className="min-w-0 rounded-xl border border-line bg-surface-alt p-4">
            <span className={`inline-grid h-9 w-9 shrink-0 place-items-center rounded-lg border text-base ${TONE_ICON_BOX[tile.tone]}`}>
              {tile.icon}
            </span>
            <p className="mt-3 text-xs text-slate">{tile.label}</p>
            <p className="mt-1 break-words font-display text-xl font-semibold text-ink">{formatNaira(tile.amount)}</p>
            <p className={`mt-1.5 break-words text-xs font-medium ${TONE_NOTE_TEXT[tile.tone]}`}>{tile.note}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}