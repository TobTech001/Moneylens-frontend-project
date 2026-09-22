import { Link } from 'react-router-dom';
import Reveal from '../common/Reveal';
import { IconCheck } from '../Icons';
import type { BillingPeriod, PRICING_PLANS } from '../../data/LandingPageData';

type Plan = (typeof PRICING_PLANS)[number];

function formatNaira(n: number) {
  return `₦${Math.round(n).toLocaleString('en-NG')}`;
}

interface PricingCardProps {
  plan: Plan;
  period: BillingPeriod;
  delay?: number;
}

export default function PricingCard({ plan, period, delay = 0 }: PricingCardProps) {
  const price = period === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice / 12;
  const isFree = plan.monthlyPrice === 0;

  return (
    <Reveal delay={delay} className="h-full">
      <div
        className={`relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
          plan.highlighted ? 'border-primary/40 bg-primary-tint shadow-[0_0_40px_-15px_var(--color-primary)]' : 'border-line bg-surface'
        }`}
      >
        {plan.highlighted && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-bg">
            Most Popular
          </span>
        )}

        <p className="font-display text-lg font-semibold text-ink">{plan.name}</p>
        <p className="mt-1 text-sm text-slate">{plan.tagline}</p>

        <p className="mt-5">
          <span className="font-display text-3xl font-semibold text-ink transition-all duration-300">
            {isFree ? '₦0' : formatNaira(price)}
          </span>
          <span className="text-sm text-mist">/month</span>
        </p>
        {period === 'yearly' && !isFree && (
          <p className="mt-1 text-xs text-primary">Billed {formatNaira(plan.yearlyPrice)} yearly — save 20%</p>
        )}

        <ul className="mt-6 flex-1 space-y-2.5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-slate">
              <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>

        <Link
          to="/register"
          className={`mt-6 inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold transition-colors ${
            plan.highlighted ? 'bg-primary text-bg hover:bg-primary-hover' : 'border border-line text-ink hover:border-primary/40 hover:bg-surface-alt'
          }`}
        >
          {plan.cta}
        </Link>
      </div>
    </Reveal>
  );
}