import SettingsSection from './SettingsSection';
import SettingRow from './SettingRow';
import SettingSelect from './SettingSelect';
import type { DashboardPeriod, DateFormat, FirstDayOfWeek, UserSettings } from '../../types/settings';

const LANGUAGE_OPTIONS = [
  { label: 'English', value: 'English' },
  { label: 'Yoruba (coming soon)', value: 'Yoruba', disabled: true },
  { label: 'Hausa (coming soon)', value: 'Hausa', disabled: true },
  { label: 'Igbo (coming soon)', value: 'Igbo', disabled: true },
];

const TIMEZONE_OPTIONS = [
  { label: 'Africa/Lagos (GMT+1)', value: 'Africa/Lagos (GMT+1)' },
  { label: 'Africa/Accra (GMT+0)', value: 'Africa/Accra (GMT+0)' },
  { label: 'Europe/London (GMT+0/+1)', value: 'Europe/London (GMT+0/+1)' },
];

const DATE_FORMAT_OPTIONS: { label: string; value: DateFormat }[] = [
  { label: 'DD/MM/YYYY', value: 'DD/MM/YYYY' },
  { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
  { label: 'YYYY-MM-DD', value: 'YYYY-MM-DD' },
];

const FIRST_DAY_OPTIONS: { label: string; value: FirstDayOfWeek }[] = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Sunday', value: 'Sunday' },
];

const PERIOD_OPTIONS: { label: string; value: DashboardPeriod }[] = [
  { label: 'This Week', value: 'This Week' },
  { label: 'This Month', value: 'This Month' },
  { label: 'Last Month', value: 'Last Month' },
  { label: 'This Year', value: 'This Year' },
];

interface GeneralSettingsProps {
  settings: UserSettings;
  onChange: (patch: Partial<UserSettings>) => void;
}

export default function GeneralSettings({ settings, onChange }: GeneralSettingsProps) {
  return (
    <SettingsSection title="General" description="Language, region, and default views across MoneyLens.">
      <SettingRow label="Language" description="Only English is available for now.">
        <SettingSelect ariaLabel="Language" value={settings.language} onChange={(v) => onChange({ language: v })} options={LANGUAGE_OPTIONS} />
      </SettingRow>
      <SettingRow label="Time Zone">
        <SettingSelect ariaLabel="Time zone" value={settings.timezone} onChange={(v) => onChange({ timezone: v })} options={TIMEZONE_OPTIONS} />
      </SettingRow>
      <SettingRow label="Date Format">
        <SettingSelect ariaLabel="Date format" value={settings.dateFormat} onChange={(v) => onChange({ dateFormat: v as DateFormat })} options={DATE_FORMAT_OPTIONS} />
      </SettingRow>
      <SettingRow label="First Day of Week">
        <SettingSelect ariaLabel="First day of week" value={settings.firstDayOfWeek} onChange={(v) => onChange({ firstDayOfWeek: v as FirstDayOfWeek })} options={FIRST_DAY_OPTIONS} />
      </SettingRow>
      <SettingRow label="Default Dashboard Period">
        <SettingSelect
          ariaLabel="Default dashboard period"
          value={settings.defaultDashboardPeriod}
          onChange={(v) => onChange({ defaultDashboardPeriod: v as DashboardPeriod })}
          options={PERIOD_OPTIONS}
        />
      </SettingRow>
    </SettingsSection>
  );
}