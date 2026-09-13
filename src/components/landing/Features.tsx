import Container from './Container';
import { IconCard, IconChart, IconTag, IconTarget, IconHandshake, IconBell } from '../Icons';

const FEATURES = [
  {
    icon: IconCard,
    title: 'Smart transaction tracking',
    description: 'Track and organize your transactions in one place.',
    accent: 'primary' as const,
  },
  {
    icon: IconTag,
    title: 'Automatic categorization',
    description: 'Understand spending on Food, Transport, Data, Bills, and more.',
    accent: 'accent' as const,
  },
  {
    icon: IconChart,
    title: 'Powerful analytics',
    description: 'See exactly where your money goes, month over month.',
    accent: 'primary' as const,
  },
  {
    icon: IconTarget,
    title: 'Budget control',
    description: 'Set spending limits and stay in control of your money.',
    accent: 'accent' as const,
  },
  {
    icon: IconHandshake,
    title: 'Borrow & lend',
    description: 'Keep track of money you borrowed and money you lent.',
    accent: 'primary' as const,
  },
  {
    icon: IconBell,
    title: 'Subscription reminders',
    description: 'Never forget an important recurring payment.',
    accent: 'accent' as const,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Everything you need to understand your money
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, accent }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-soft"
            >
              <div
                className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20 ${
                  accent === 'primary' ? 'bg-primary' : 'bg-accent'
                }`}
                aria-hidden
              />
              <span
                className={`relative grid h-11 w-11 place-items-center rounded-xl border ${
                  accent === 'primary'
                    ? 'border-primary/25 bg-primary-tint text-primary'
                    : 'border-accent/25 bg-accent-tint text-accent'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="relative mt-4 text-base font-semibold text-ink">{title}</h3>
              <p className="relative mt-1.5 text-sm leading-relaxed text-slate">{description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}