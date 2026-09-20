import type { ReactNode } from 'react';
import SettingsSidebar from './SettingsSidebar';
import SettingsMobileNav from './SettingsMobileNav';
import type { SettingsSectionId } from '../../types/settings';

interface SettingsLayoutProps {
  sections: { id: SettingsSectionId; label: string }[];
  active: SettingsSectionId;
  onChange: (id: SettingsSectionId) => void;
  children: ReactNode;
}

export default function SettingsLayout({ sections, active, onChange, children }: SettingsLayoutProps) {
  return (
    <div className="space-y-5">
      <SettingsMobileNav sections={sections} active={active} onChange={onChange} />
      <div className="flex gap-6">
        <SettingsSidebar sections={sections} active={active} onChange={onChange} />
        <div className="min-w-0 flex-1 space-y-6">{children}</div>
      </div>
    </div>
  );
}