import { useNavigate } from 'react-router-dom';
import { IconPlus, IconTarget, IconBell } from '../Icons';

const ACTIONS = [
  { label: 'Add Transaction', icon: IconPlus, primary: true, href: '/transactions?add=1' },
  { label: 'Set Budget', icon: IconTarget, primary: false, href: '/budget?add=1' },
  { label: 'Add Subscription', icon: IconBell, primary: false, href: '/subscriptions?add=1' },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-wrap gap-2.5">
      {ACTIONS.map(({ label, icon: Icon, primary, href }) => (
        <button
          key={label}
          type="button"
          title={label}
          onClick={() => navigate(href)}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
            primary
              ? 'bg-primary text-bg shadow-[0_0_20px_-8px_var(--color-primary)] hover:bg-primary-hover'
              : 'border border-line bg-surface text-ink hover:border-primary/30 hover:bg-surface-alt'
          }`}
        >
          <Icon className="h-4 w-4" />
          {label}
        </button>
      ))}
    </div>
  );
}