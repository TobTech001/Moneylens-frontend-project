import Container from './Container';
import FeatureCard from './FeatureCard';
import Reveal from '../common/Reveal';
import { FEATURES } from '../../data/LandingPageData';

export default function Features() {
  return (
    <section id="features" className="bg-bg-alt py-20 sm:py-28">
      <Container>
        <Reveal>
          <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            Everything You Need to Understand Your Money
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-slate">
            MoneyLens gives you the tools to track, understand, and improve your financial habits.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} icon={feature.icon} title={feature.title} description={feature.description} delay={i * 80} />
          ))}
        </div>
      </Container>
    </section>
  );
}