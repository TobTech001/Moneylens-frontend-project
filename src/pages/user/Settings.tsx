import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Toast from '../../components/common/Toast';
import SettingsLayout from '../../components/settings/SettingsLayout';
import GeneralSettings from '../../components/settings/GeneralSettings';
import AppearanceSettings from '../../components/settings/AppearanceSettings';
import NotificationSettings from '../../components/settings/NotificationSettings';
import PrivacySettings from '../../components/settings/PrivacySettings';
import SecuritySettings from '../../components/settings/SecuritySettings';
import FinancialPreferences from '../../components/settings/FinancialPreferences';
import DataStorageSettings from '../../components/settings/DataStorageSettings';
import AccountSettings from '../../components/settings/AccountSettings';
import { getSettings, saveSettings, resetSettings, clearLocalData } from '../../data/SettingsData';
import { SETTINGS_SECTIONS, type SettingsSectionId, type UserSettings } from '../../types/settings';
import { useAuth } from '../../hooks/useAuth';

const DRAFT_SECTIONS: SettingsSectionId[] = ['general', 'appearance', 'notifications', 'privacy'];

export default function Settings() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [activeSection, setActiveSection] = useState<SettingsSectionId>('general');
  const [draft, setDraft] = useState<UserSettings>(() => getSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
  }

  function updateDraft(patch: Partial<UserSettings>) {
    setDraft((prev) => ({ ...prev, ...patch }));
  }

  function handleSave() {
    setIsSaving(true);
    setTimeout(() => {
      saveSettings(draft);
      setIsSaving(false);
      showToast('Settings saved successfully.');
    }, 500);
  }

  function handleResetConfirmed() {
    const defaults = resetSettings();
    setDraft(defaults);
    setIsResetModalOpen(false);
    showToast('Settings reset to default.');
  }

  function handleSaveFinancialPreferences(updates: UserSettings['financialPreferences']) {
    const next = { ...draft, financialPreferences: updates };
    setDraft(next);
    saveSettings(next);
    showToast('Financial preferences updated successfully.');
  }

  function handleLogout() {
    logout();
    showToast('You have been logged out.');
    navigate('/login');
  }

  function handleAccountDeleted() {
    clearLocalData();
    logout();
    showToast('Your account has been deleted.');
    navigate('/login');
  }

  const showDraftActions = DRAFT_SECTIONS.includes(activeSection);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-slate">Manage your MoneyLens preferences, notifications, privacy, and account settings.</p>
      </div>

      <SettingsLayout sections={SETTINGS_SECTIONS} active={activeSection} onChange={setActiveSection}>
        {activeSection === 'general' && <GeneralSettings settings={draft} onChange={updateDraft} />}
        {activeSection === 'appearance' && <AppearanceSettings settings={draft} onChange={updateDraft} />}
        {activeSection === 'notifications' && (
          <NotificationSettings notifications={draft.notifications} onChange={(patch) => updateDraft({ notifications: { ...draft.notifications, ...patch } })} />
        )}
        {activeSection === 'privacy' && (
          <PrivacySettings privacy={draft.privacy} onChange={(patch) => updateDraft({ privacy: { ...draft.privacy, ...patch } })} />
        )}
        {activeSection === 'security' && (
          <SecuritySettings
            onPasswordChanged={() => showToast('Password changed successfully.')}
            onSignedOutOtherSessions={() => showToast('Other sessions have been signed out.')}
          />
        )}
        {activeSection === 'financial' && (
          <FinancialPreferences preferences={draft.financialPreferences} onSave={handleSaveFinancialPreferences} />
        )}
        {activeSection === 'data' && (
          <DataStorageSettings
            onExported={() => showToast('Your MoneyLens data export has been generated.')}
            onDataCleared={() => showToast('Local MoneyLens data has been cleared.')}
          />
        )}
        {activeSection === 'account' && <AccountSettings onLogout={handleLogout} onAccountDeleted={handleAccountDeleted} />}

        {showDraftActions && (
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button type="button" variant="ghost" onClick={() => setIsResetModalOpen(true)}>
              Reset to Default
            </Button>
            <Button type="button" onClick={handleSave} isLoading={isSaving} loadingText="Saving...">
              Save Changes
            </Button>
          </div>
        )}
      </SettingsLayout>

      <Modal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        title="Reset to default settings?"
        size="sm"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setIsResetModalOpen(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleResetConfirmed}>
              Reset Settings
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate">This will restore every MoneyLens preference to its default value.</p>
      </Modal>

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}