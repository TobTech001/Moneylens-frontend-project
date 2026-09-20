import SettingsSection from './SettingsSection';
import SettingRow from './SettingRow';
import SettingToggle from './SettingToggle';
import { IconShield } from '../Icons';
import type { PrivacySettings as PrivacySettingsType } from '../../types/settings';

interface PrivacySettingsProps {
  privacy: PrivacySettingsType;
  onChange: (patch: Partial<PrivacySettingsType>) => void;
}

export default function PrivacySettings({ privacy, onChange }: PrivacySettingsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary-tint p-4">
        <IconShield className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-sm font-medium text-ink">Financial Data Visibility</p>
          <p className="mt-1 text-sm text-slate">Your financial information is private and only visible within your MoneyLens account.</p>
        </div>
      </div>

      <SettingsSection title="Activity Visibility">
        <SettingRow label="Show Financial Insights" description="Allow MoneyLens to display personalized financial insights on your dashboard.">
          <SettingToggle checked={privacy.showInsights} onChange={(v) => onChange({ showInsights: v })} label="Show Financial Insights" />
        </SettingRow>
      </SettingsSection>

      <SettingsSection title="Analytics">
        <SettingRow label="Usage Analytics" description="Allow anonymous usage analytics to improve the application. This is a frontend-only simulation — MoneyLens has no analytics backend yet.">
          <SettingToggle checked={privacy.usageAnalytics} onChange={(v) => onChange({ usageAnalytics: v })} label="Usage Analytics" />
        </SettingRow>
      </SettingsSection>

      <div className="rounded-2xl border border-line bg-surface-alt p-4">
        <p className="text-sm font-medium text-ink">How MoneyLens uses your data</p>
        <p className="mt-1.5 text-sm leading-relaxed text-slate">
          MoneyLens uses your transaction information to organize spending, calculate budgets, and generate financial insights.
        </p>
      </div>
    </div>
  );
}