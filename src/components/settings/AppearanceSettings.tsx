import SettingsSection from './SettingsSection';
import SettingRow from './SettingRow';
import SettingToggle from './SettingToggle';
import { IconCheck } from '../Icons';
import type { AccentColor, Theme, UserSettings } from '../../types/settings';

const THEME_OPTIONS: { label: string; value: Theme }[] = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
  { label: 'System', value: 'system' },
];

const ACCENT_OPTIONS: { label: string; value: AccentColor; swatch: string }[] = [
  { label: 'Emerald', value: 'emerald', swatch: '#10b981' },
  { label: 'Blue', value: 'blue', swatch: '#3b82f6' },
  { label: 'Purple', value: 'purple', swatch: '#6366f1' },
];

interface AppearanceSettingsProps {
  settings: UserSettings;
  onChange: (patch: Partial<UserSettings>) => void;
}

export default function AppearanceSettings({ settings, onChange }: AppearanceSettingsProps) {
  return (
    <SettingsSection title="Appearance" description="MoneyLens is designed primarily for dark mode.">
      <SettingRow label="Theme">
        <div className="flex gap-2">
          {THEME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ theme: opt.value })}
              aria-pressed={settings.theme === opt.value}
              className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors ${
                settings.theme === opt.value ? 'border-primary/40 bg-primary-tint text-primary' : 'border-line bg-surface-alt text-slate hover:text-ink'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </SettingRow>

      <SettingRow label="Accent Color">
        <div className="flex gap-2">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange({ accentColor: opt.value })}
              aria-pressed={settings.accentColor === opt.value}
              aria-label={opt.label}
              className="grid h-9 w-9 place-items-center rounded-full border-2 transition-colors"
              style={{ borderColor: settings.accentColor === opt.value ? opt.swatch : 'var(--color-line)' }}
            >
              <span className="grid h-6 w-6 place-items-center rounded-full" style={{ backgroundColor: opt.swatch }}>
                {settings.accentColor === opt.value && <IconCheck className="h-3.5 w-3.5 text-white" />}
              </span>
            </button>
          ))}
        </div>
      </SettingRow>

      <SettingRow label="Compact Mode" description="Reduce spacing and make dashboard information more condensed.">
        <SettingToggle checked={settings.compactMode} onChange={(v) => onChange({ compactMode: v })} label="Compact Mode" />
      </SettingRow>

      <SettingRow label="Reduce Motion" description="Reduce animations and transitions throughout the application.">
        <SettingToggle checked={settings.reduceMotion} onChange={(v) => onChange({ reduceMotion: v })} label="Reduce Motion" />
      </SettingRow>
    </SettingsSection>
  );
}