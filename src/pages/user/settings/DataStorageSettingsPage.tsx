import { useState } from 'react';
import Toast from '../../../components/common/Toast';
import DataStorageSettings from '../../../components/settings/DataStorageSettings';

export default function DataStorageSettingsPage() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
  }

  return (
    <div className="space-y-6">
      <DataStorageSettings
        onExported={() => showToast('Your MoneyLens data export has been generated.')}
        onDataCleared={() => showToast('Local MoneyLens data has been cleared.')}
      />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}