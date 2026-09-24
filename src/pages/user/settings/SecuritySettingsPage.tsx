import { useState } from 'react';
import Toast from '../../../components/common/Toast';
import SecuritySettings from '../../../components/settings/SecuritySettings';

export default function SecuritySettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
  }

  return (
    <div className="space-y-6">
      <SecuritySettings
        onPasswordChanged={() => showToast('Password changed successfully.')}
        onSignedOutOtherSessions={() => showToast('Other sessions have been signed out.')}
      />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}