import { useState } from 'react';
import Toast from '../../../components/common/Toast';
import FinancialPreferences from '../../../components/settings/FinancialPreferences';
import { getSettings, saveSettings } from '../../../data/SettingsData';
import type { UserSettings } from '../../../types/settings';

export default function FinancialPreferencesPage() {
  const [preferences, setPreferences] = useState<UserSettings['financialPreferences']>(() => getSettings().financialPreferences);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
  }

  function handleSave(updates: UserSettings['financialPreferences']) {
    const current = getSettings();
    saveSettings({ ...current, financialPreferences: updates });
    setPreferences(updates);
    showToast('Financial preferences updated successfully.');
  }

  return (
    <div className="space-y-6">
      <FinancialPreferences preferences={preferences} onSave={handleSave} />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}