import { getGreeting, CURRENT_USER } from '../../data/DashboardData';
import Reveal from '../common/Reveal';

export default function WelcomeSection() {
  const today = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date());

  return (
    <Reveal variant="fade-up">
      <div>
        <p className="text-sm text-slate">{today}</p>
        <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
          {getGreeting()}, {CURRENT_USER.name} 👋
        </h1>
        <p className="mt-1.5 text-sm text-slate">Here's what's happening with your money today.</p>
      </div>
    </Reveal>
  );
}