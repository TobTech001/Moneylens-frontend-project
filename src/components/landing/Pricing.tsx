import { useState } from 'react';
import Container from './Container';
import Reveal from './Reveal';
import PricingCard from './PricingCard';
import { PRICING_PLANS, type BillingPeriod } from '../../data/LandingPageData';

export default function Pricing() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly');

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <Container>
        <Reveal className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Simple, Honest Pricing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate">Start free. Upgrade when MoneyLens earns it.</p>
        </Reveal>

        <Reveal delay={100} className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1">
            {(['monthly', 'yearly'] as BillingPeriod[]).map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setPeriod(opt)}
                aria-pressed={period === opt}
                className={`rounded-full px-4 py-2 text-sm font-medium capitalize transition-colors ${
                  period === opt ? 'bg-primary text-bg' : 'text-slate hover:text-ink'
                }`}
              >
                {opt}
                {opt === 'yearly' && (
                  <span className={`ml-1.5 text-xs ${period === 'yearly' ? 'text-bg/70' : 'text-primary'}`}>-20%</span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} period={period} delay={i * 100} />
          ))}
        </div>
      </Container>
    </section>
  );
}