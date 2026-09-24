import { IconSettings, IconPalette, IconBell, IconShield, IconLock, IconTarget, IconDatabase, IconUserCircle } from '../Icons';
import type { SettingsSectionId } from '../../types/settings';

export const SETTINGS_SECTION_ICONS: Record<SettingsSectionId, typeof IconSettings> = {
  general: IconSettings,
  appearance: IconPalette,
  notifications: IconBell,
  privacy: IconShield,
  security: IconLock,
  financial: IconTarget,
  data: IconDatabase,
  account: IconUserCircle,
};

export const SETTINGS_SECTION_DESCRIPTIONS: Record<SettingsSectionId, string> = {
  general: 'Language, region, and default views',
  appearance: 'Theme, accent color, and layout density',
  notifications: 'Choose what MoneyLens notifies you about',
  privacy: 'Control what MoneyLens shows and shares',
  security: 'Password, sessions, and two-factor authentication',
  financial: 'Currency, income range, and saving targets',
  data: 'Storage usage, data export, and clearing local data',
  account: 'Account details, logout, and account deletion',
};