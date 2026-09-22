import { IconCard, IconChart, IconTarget, IconHandshake, IconBell, IconBulb, IconArrowRight } from '../Icons';
import Reveal from '../common/Reveal';

const ICONS = { card: IconCard, chart: IconChart, target: IconTarget, handshake: IconHandshake, bell: IconBell, bulb: IconBulb };

interface FeatureCardProps {
  icon: keyof typeof ICONS;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  const Icon = ICONS[icon];

  return (
    <Reveal variant="fade-up" delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
        <div
          className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-20"
          aria-hidden
        />
        <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-primary/25 bg-primary-tint text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="relative mt-4 text-base font-semibold text-ink">{title}</h3>
        <p className="relative mt-1.5 text-sm leading-relaxed text-slate">{description}</p>
        <span className="relative mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
          Learn more <IconArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Reveal>
  );
}