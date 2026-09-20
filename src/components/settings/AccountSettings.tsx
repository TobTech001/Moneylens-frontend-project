import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import Modal from '../common/Modal';
import DeleteAccountModal from './DeleteAccountModal';

function formatMonthYear(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'long', year: 'numeric' });
}

interface AccountSettingsProps {
  onLogout: () => void;
  onAccountDeleted: () => void;
}

export default function AccountSettings({ onLogout, onAccountDeleted }: AccountSettingsProps) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const rows = [
    { label: 'Account Type', value: 'Personal' },
    { label: 'Account Status', value: <Badge tone="positive">Active</Badge> },
    { label: 'Member Since', value: formatMonthYear('2026-09-01') },
    { label: 'User ID', value: 'ML-USER-001' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Account Information</h2>
        <div className="mt-4 divide-y divide-line">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
              <span className="text-sm text-slate">{row.label}</span>
              <span className="text-sm font-medium text-ink">{row.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Log Out</h2>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate">Sign out of your MoneyLens account on this device.</p>
          <Button type="button" variant="secondary" onClick={() => setIsLogoutModalOpen(true)}>
            Log Out
          </Button>
        </div>
      </Card>

      <Card className="!border-danger/25">
        <h2 className="font-display text-lg font-semibold text-danger">Delete Account</h2>
        <p className="mt-1 text-sm text-slate">Permanently delete your MoneyLens account and associated data.</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="secondary" onClick={() => setIsDeleteModalOpen(true)} className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90">
            Delete Account
          </Button>
        </div>
      </Card>

      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        title="Log out of MoneyLens?"
        size="sm"
        footer={
          <>
            <Button type="button" variant="secondary" onClick={() => setIsLogoutModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsLogoutModalOpen(false);
                onLogout();
              }}
            >
              Log Out
            </Button>
          </>
        }
      >
        <p className="text-sm leading-relaxed text-slate">You'll need to log in again to access your MoneyLens account.</p>
      </Modal>

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          onAccountDeleted();
        }}
      />
    </div>
  );
}