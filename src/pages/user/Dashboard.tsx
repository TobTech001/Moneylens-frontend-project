import WelcomeSection from '../../components/dashboard/WelcomeSection';
import QuickActions from '../../components/dashboard/QuickActions';
import FinancialOverview from '../../components/dashboard/FinancialOverview';
import SpendingOverview from '../../components/dashboard/SpendingOverview';
import SpendingCategories from '../../components/dashboard/SpendingCategories';
import RecentTransactions from '../../components/dashboard/RecentTransactions';
import BudgetProgress from '../../components/dashboard/BudgetProgress';
import SubscriptionPreview from '../../components/dashboard/SubscriptionPreview';
import BorrowLendPreview from '../../components/dashboard/BorrowLendPreview';

function FinancialInsights() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">Financial insights</h2>
      <p className="mt-2 text-sm text-slate-600">
        Keep an eye on your spending and financial goals.
      </p>
    </section>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <WelcomeSection />
        <QuickActions />
      </div>

      <FinancialOverview />

      {/* Insights surface right after the numbers on mobile — priority order is
          balance → spending → insights → transactions, per the dashboard brief. */}
      <div className="lg:hidden">
        <FinancialInsights />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <SpendingOverview />
          <SpendingCategories />
          <RecentTransactions />
        </div>

        <div className="space-y-6">
          <div className="hidden lg:block">
            <FinancialInsights />
          </div>
          <BudgetProgress />
          <SubscriptionPreview />
          <BorrowLendPreview />
        </div>
      </div>
    </div>
  );
}