import { useState } from 'react';
import Container from './Container';
import Reveal from './Reveal';
import { DASHBOARD_TABS, ANALYTICS_CATEGORIES, type DashboardTab } from '../../data/LandingPageData';
import { IconCheck } from '../icons';

const OVERVIEW_TRANSACTIONS = [
  { name: 'Chicken Republic', category: 'Food', amount: '-₦4,500' },
  { name: 'Bolt', category: 'Transport', amount: '-₦3,200' },
  { name: 'Salary', category: 'Income', amount: '+₦250,000' },
  { name: 'Netflix', category: 'Subscriptions', amount: '-₦6,000' },
];

const BUDGETS = [
  { category: 'Food', spent: 24500, limit: 30000 },
  { category: 'Transport', spent: 18000, limit: 25000 },
  { category: 'Entertainment', spent: 12000, limit: 10000 },
];

function TabPanel({ tab }: { tab: DashboardTab }) {
  if (tab === 'overview') {
    return (
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-gradient-to-br from-primary-dim to-primary-tint p-4 sm:col-span-1">
          <p className="text-xs text-primary-hover/90">Balance</p>
          <p className="mt-1 font-display text-2xl font-semibold text-white">₦524,680</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-slate">Income</p>
          <p className="mt-1 font-display text-2xl font-semibold text-primary">+₦250,000</p>
        </div>
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-xs text-slate">Expenses</p>
          <p className="mt-1 font-display text-2xl font-semibold text-ink">-₦120,000</p>
        </div>
      </div>
    );
  }

  if (tab === 'analytics') {
    return (
      <div className="space-y-3">
        {ANALYTICS_CATEGORIES.map((c) => (
          <div key={c.category} className="flex items-center gap-3">
            <span className="w-32 shrink-0 text-sm text-ink">
              {c.icon} {c.category}
            </span>
            <div className="h-2 flex-1 rounded-full bg-surface-alt">
              <div className="h-2 rounded-full bg-gradient-to-r from-primary to-accent-2" style={{ width: `${c.percentage}%` }} />
            </div>
            <span className="w-10 shrink-0 text-right text-xs text-slate">{c.percentage}%</span>
          </div>
        ))}
      </div>
    );
  }

  if (tab === 'budget') {
    return (
      <div className="space-y-4">
        {BUDGETS.map((b) => {
          const pct = Math.min(100, Math.round((b.spent / b.limit) * 100));
          const over = pct >= 100;
          return (
            <div key={b.category}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink">{b.category}</span>
                <span className="text-slate">
                  ₦{b.spent.toLocaleString('en-NG')} / ₦{b.limit.toLocaleString('en-NG')}
                </span>
              </div>
              <div className="mt-1.5 h-2 rounded-full bg-surface-alt">
                <div className={`h-2 rounded-full ${over ? 'bg-danger' : 'bg-primary'}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="divide-y divide-line">
      {OVERVIEW_TRANSACTIONS.map((t) => (
        <div key={t.name} className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
          <div>
            <p className="text-sm font-medium text-ink">{t.name}</p>
            <p className="text-xs text-mist">{t.category}</p>
          </div>
          <span className={`text-sm font-semibold ${t.amount.startsWith('+') ? 'text-primary' : 'text-ink'}`}>{t.amount}</span>
        </div>
      ))}
    </div>
  );
}

export default function InteractiveDashboard() {
  const [tab, setTab] = useState<DashboardTab>('overview');

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            See Your Financial Life Clearly
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">
            One dashboard for everything — balance, spending, budgets, and transactions, always up to date.
          </p>
        </Reveal>

        <Reveal variant="scale-in" delay={150} className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-line bg-surface p-3 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.7)] sm:p-4">
            <div className="flex gap-1 overflow-x-auto rounded-lg border border-line bg-surface-alt p-1">
              {DASHBOARD_TABS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  aria-pressed={tab === t.id}
                  className={`shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                    tab === t.id ? 'bg-primary text-bg' : 'text-slate hover:text-ink'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="mt-4 min-h-[13rem] rounded-xl border border-line bg-bg-alt p-5 transition-all duration-300 sm:p-6">
              <TabPanel tab={tab} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={250} className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-mist">
          {['No spreadsheets', 'Updates instantly', 'Works on any device'].map((item) => (
            <span key={item} className="inline-flex items-center gap-1.5">
              <IconCheck className="h-3.5 w-3.5 text-primary" />
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}