import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../../components/common/Toast';
import AccountSettings from '../../../components/settings/AccountSettings';
import { clearLocalData } from '../../../data/SettingsData';
import { useAuth } from '../../../hooks/useAuth';

export default function AccountSettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function showToast(message: string) {
    setToastMessage(message);
    window.setTimeout(() => setToastMessage((current) => (current === message ? null : current)), 2800);
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

  return (
    <div className="space-y-6">
      <AccountSettings onLogout={handleLogout} onAccountDeleted={handleAccountDeleted} />
      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}