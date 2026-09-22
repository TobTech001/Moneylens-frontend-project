import WelcomeSection from '../../components/dashboard/WelcomeSection';
import QuickActions from '../../components/dashboard/QuickActions';
import FinancialOverview from '../../components/dashboard/FinancialOverview';
import SpendingOverview from '../../components/dashboard/SpendingOverview';
import SpendingCategories from '../../components/dashboard/SpendingCategories';
import FinancialInsights from '../../components/dashboard/FinancialInsights';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import BudgetProgress from '../../components/dashboard/BudgetProgress';
import SubscriptionPreview from '../../components/dashboard/SubscriptionPreview';
import BorrowLendPreview from '../../components/dashboard/BorrowLendPreview';
import Reveal from '../../components/common/Reveal';

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <WelcomeSection />
        <Reveal variant="fade-up" delay={100}>
          <QuickActions />
        </Reveal>
      </div>

      <Reveal variant="fade-up" delay={150}>
        <FinancialOverview />
      </Reveal>

      {/* Insights surface right after the numbers on mobile — priority order is
          balance → spending → insights → transactions, per the dashboard brief. */}
      <div className="lg:hidden">
        <Reveal variant="fade-up" delay={200}>
          <FinancialInsights />
        </Reveal>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Reveal variant="fade-up" delay={200}>
            <SpendingOverview />
          </Reveal>
          <Reveal variant="fade-up" delay={250}>
            <SpendingCategories />
          </Reveal>
          <Reveal variant="fade-up" delay={300}>
            <RecentTransactions />
          </Reveal>
        </div>

        <div className="space-y-6">
          <div className="hidden lg:block">
            <Reveal variant="fade-up" delay={250}>
              <FinancialInsights />
            </Reveal>
          </div>
          <Reveal variant="fade-up" delay={300}>
            <BudgetProgress />
          </Reveal>
          <Reveal variant="fade-up" delay={350}>
            <SubscriptionPreview />
          </Reveal>
          <Reveal variant="fade-up" delay={400}>
            <BorrowLendPreview />
          </Reveal>
        </div>
      </div>
    </div>
  );
}