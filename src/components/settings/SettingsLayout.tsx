import { Link, Outlet, useLocation } from 'react-router-dom';
import SettingsSidebar from './SettingsSidebar';
import { SETTINGS_SECTIONS } from '../../types/settings';
import { IconArrowLeft } from '../Icons';

export default function SettingsLayout() {
  const location = useLocation();
  const isIndex = location.pathname === '/settings' || location.pathname === '/settings/';
  const currentId = location.pathname.split('/')[2];
  const currentSection = SETTINGS_SECTIONS.find((s) => s.id === currentId);

  return (
    <div className="space-y-6">
      {/* Generic header: always on desktop; on mobile only at the category-list screen. */}
      <div className={isIndex ? '' : 'hidden lg:block'}>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-slate">Manage your MoneyLens preferences, notifications, privacy, and account settings.</p>
      </div>

      {/* Mobile-only: back link + section title, replacing the generic header on a section page. */}
      {!isIndex && currentSection && (
        <div className="lg:hidden">
          <Link to="/settings" className="inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-ink">
            <IconArrowLeft className="h-4 w-4" />
            Settings
          </Link>
          <h1 className="mt-3 font-display text-2xl font-semibold text-ink">{currentSection.label}</h1>
        </div>
      )}

      <div className="flex gap-6">
        <SettingsSidebar sections={SETTINGS_SECTIONS} />
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}