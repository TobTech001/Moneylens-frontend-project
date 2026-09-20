import SettingsSection from './SettingsSection';
import SettingRow from './SettingRow';
import SettingToggle from './SettingToggle';
import type { NotificationSettings as NotificationSettingsType } from '../../types/settings';

interface NotificationSettingsProps {
  notifications: NotificationSettingsType;
  onChange: (patch: Partial<NotificationSettingsType>) => void;
}

export default function NotificationSettings({ notifications, onChange }: NotificationSettingsProps) {
  return (
    <div className="space-y-6">
      <SettingsSection title="Transaction Notifications">
        <SettingRow label="New Transaction" description="Notify me when a new transaction is added.">
          <SettingToggle checked={notifications.newTransaction} onChange={(v) => onChange({ newTransaction: v })} label="New Transaction" />
        </SettingRow>
        <SettingRow label="Large Transaction" description="Notify me when a transaction exceeds my selected threshold.">
          <SettingToggle checked={notifications.largeTransaction} onChange={(v) => onChange({ largeTransaction: v })} label="Large Transaction" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Budget Notifications">
        <SettingRow label="Budget Warning" description="Notify me when I approach a budget limit.">
          <SettingToggle checked={notifications.budgetWarning} onChange={(v) => onChange({ budgetWarning: v })} label="Budget Warning" />
        </SettingRow>
        <SettingRow label="Budget Exceeded" description="Notify me when I exceed a budget.">
          <SettingToggle checked={notifications.budgetExceeded} onChange={(v) => onChange({ budgetExceeded: v })} label="Budget Exceeded" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Subscription Notifications">
        <SettingRow label="Upcoming Subscription" description="Remind me before a subscription payment is due.">
          <SettingToggle checked={notifications.upcomingSubscription} onChange={(v) => onChange({ upcomingSubscription: v })} label="Upcoming Subscription" />
        </SettingRow>
        <SettingRow label="Subscription Payment" description="Notify me when a subscription payment is recorded.">
          <SettingToggle checked={notifications.subscriptionPayment} onChange={(v) => onChange({ subscriptionPayment: v })} label="Subscription Payment" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Borrow & Lend">
        <SettingRow label="Payment Reminder" description="Remind me about upcoming borrowed/lent payments.">
          <SettingToggle checked={notifications.paymentReminder} onChange={(v) => onChange({ paymentReminder: v })} label="Payment Reminder" />
        </SettingRow>
        <SettingRow label="Overdue Payment" description="Notify me when a payment becomes overdue.">
          <SettingToggle checked={notifications.overduePayment} onChange={(v) => onChange({ overduePayment: v })} label="Overdue Payment" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Financial Insights">
        <SettingRow label="Weekly Insights" description="Receive a weekly spending summary.">
          <SettingToggle checked={notifications.weeklyInsights} onChange={(v) => onChange({ weeklyInsights: v })} label="Weekly Insights" />
        </SettingRow>
        <SettingRow label="Monthly Insights" description="Receive a monthly financial report.">
          <SettingToggle checked={notifications.monthlyInsights} onChange={(v) => onChange({ monthlyInsights: v })} label="Monthly Insights" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Notification Channels" description="These are frontend-only preferences for now.">
        <SettingRow label="In-App Notifications">
          <SettingToggle checked={notifications.inApp} onChange={(v) => onChange({ inApp: v })} label="In-App Notifications" />
        </SettingRow>
        <SettingRow label="Email Notifications">
          <SettingToggle checked={notifications.email} onChange={(v) => onChange({ email: v })} label="Email Notifications" />
        </SettingRow>
      </SettingsSection>
    </div>
  );
}