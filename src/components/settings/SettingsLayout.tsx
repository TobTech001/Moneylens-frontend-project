import { Outlet } from 'react-router-dom';
import SettingsSidebar from './SettingsSidebar';
import SettingsMobileNav from './SettingsMobileNav';
import { SETTINGS_SECTIONS } from '../../types/settings';

export default function SettingsLayout() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-slate">Manage your MoneyLens preferences, notifications, privacy, and account settings.</p>
      </div>

      <div className="space-y-5">
        <SettingsMobileNav sections={SETTINGS_SECTIONS} />
        <div className="flex gap-6">
          <SettingsSidebar sections={SETTINGS_SECTIONS} />
          <div className="min-w-0 flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}