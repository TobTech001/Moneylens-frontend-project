import { useState } from 'react';
import Button from '../../../components/common/Button';
import Modal from '../../../components/common/Modal';
import Toast from '../../../components/common/Toast';
import PrivacySettings from '../../../components/settings/PrivacySettings';
import { getSettings, saveSettings, resetSettings } from '../../../data/SettingsData';
import type { UserSettings } from '../../../types/settings';

export default function PrivacySettingsPage() {
  const [draft, setDraft] = useState<UserSettings>(() => getSettings());
  const [isSaving, setIsSaving] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
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
    setDraft(resetSettings());
    setIsResetModalOpen(false);
    showToast('Settings reset to default.');
  }

  return (
    <div className="space-y-6">
      <PrivacySettings
        privacy={draft.privacy}
        onChange={(patch) => setDraft((prev) => ({ ...prev, privacy: { ...prev.privacy, ...patch } }))}
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="ghost" onClick={() => setIsResetModalOpen(true)}>
          Reset to Default
        </Button>
        <Button type="button" onClick={handleSave} isLoading={isSaving} loadingText="Saving...">
          Save Changes
        </Button>
      </div>

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