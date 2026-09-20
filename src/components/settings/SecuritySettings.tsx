import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import ChangePasswordModal from '../profile/ChangePasswordModal';
import TwoFactorModal from './TwoFactorModal';
import { MOCK_CURRENT_SESSION } from '../../data/SettingsData';

interface SecuritySettingsProps {
  onPasswordChanged: () => void;
  onSignedOutOtherSessions: () => void;
}

export default function SecuritySettings({ onPasswordChanged, onSignedOutOtherSessions }: SecuritySettingsProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Change Password</h2>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate">Update your MoneyLens password.</p>
          <Button type="button" variant="secondary" onClick={() => setIsPasswordModalOpen(true)}>
            Change Password
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Login Sessions</h2>
        <div className="mt-4 rounded-xl border border-line bg-surface-alt p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-ink">Current Session</p>
            <Badge tone="positive">{MOCK_CURRENT_SESSION.status}</Badge>
          </div>
          <p className="mt-1.5 text-xs text-slate">
            {MOCK_CURRENT_SESSION.browser} on {MOCK_CURRENT_SESSION.device} · {MOCK_CURRENT_SESSION.location}
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="secondary" onClick={onSignedOutOtherSessions}>
            Sign Out Other Sessions
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Two-Factor Authentication</h2>
        <p className="mt-1 text-sm text-slate">Add an extra layer of security to your MoneyLens account.</p>
        <div className="mt-4 flex items-center justify-between">
          <Badge tone="neutral">Not Enabled</Badge>
          <Button type="button" variant="secondary" onClick={() => setIsTwoFactorModalOpen(true)}>
            Enable 2FA
          </Button>
        </div>
      </Card>

      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={() => {
          setIsPasswordModalOpen(false);
          onPasswordChanged();
        }}
      />

      <TwoFactorModal isOpen={isTwoFactorModalOpen} onClose={() => setIsTwoFactorModalOpen(false)} />
    </div>
  );
}