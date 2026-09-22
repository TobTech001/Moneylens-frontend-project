import { useEffect, useState } from 'react';
import Container from '../landing/Container';
import Reveal from '../common/Reveal';
import Counter from '../common/Counter';
import { ROTATING_INSIGHTS, INSIGHT_CARDS } from '../../data/LandingPageData';

const TONE_CLASSES = {
  warning: 'border-warning/25 bg-warning/10 text-warning',
  primary: 'border-primary/25 bg-primary-tint text-primary',
  accent: 'border-accent/25 bg-accent-tint text-accent',
};

function RotatingInsight() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % ROTATING_INSIGHTS.length), 3200);
    return () => clearInterval(timer);
  }, []);

  const current = ROTATING_INSIGHTS[index];

  return (
    <div className="mx-auto flex h-14 max-w-lg items-center justify-center rounded-full border border-line bg-surface px-6">
      <p
        key={index}
        className={`animate-[fadeIn_0.5s_ease-out] px-6 text-center text-sm font-medium ${
          current.tone === 'warning' ? 'text-warning' : 'text-primary'
        }`}
      >
        {current.text}
      </p>
    </div>
  );
}

export default function FinancialInsights() {
  return (
    <section id="insights" className="py-20 sm:py-28">
      <Container>
        <Reveal className="text-center">
          <p className="text-xs font-medium uppercase tracking-wide text-primary">Live from MoneyLens</p>
          <h2 className="mx-auto mt-3 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Turn Your Transactions Into Insights.
          </h2>
        </Reveal>

        <Reveal variant="scale-in" delay={100} className="mt-10">
          <RotatingInsight />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {INSIGHT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 120}>
              <div className="h-full rounded-2xl border border-line bg-surface p-6">
                <span className={`grid h-10 w-10 place-items-center rounded-xl border text-lg ${TONE_CLASSES[card.tone]}`}>
                  {card.icon}
                </span>
                <p className="mt-4 text-sm text-slate">{card.title}</p>
                <p className="mt-1 font-display text-2xl font-semibold text-ink">
                  <Counter target={card.amount} prefix="₦" />
                </p>
                <p className={`mt-1.5 text-xs font-medium ${card.tone === 'warning' ? 'text-warning' : card.tone === 'accent' ? 'text-accent' : 'text-primary'}`}>
                  {card.change}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}