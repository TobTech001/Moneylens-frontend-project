import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ChangePasswordModal from './ChangePasswordModal';
import DeleteAccountModal from './DeleteAccountModal';

interface AccountActionsProps {
  onPasswordChanged: () => void;
  onLogout: () => void;
  onAccountDeleted: () => void;
}

export default function AccountActions({ onPasswordChanged, onLogout, onAccountDeleted }: AccountActionsProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Security</h2>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink">Password</p>
            <p className="text-xs text-mist">Last changed recently</p>
          </div>
          <Button type="button" variant="secondary" onClick={() => setIsPasswordModalOpen(true)}>
            Change Password
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Account Actions</h2>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink">Logout</p>
            <p className="text-xs text-mist">Sign out of your MoneyLens account.</p>
          </div>
          <Button type="button" variant="secondary" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </Card>

      <Card className="!border-danger/25">
        <h2 className="font-display text-lg font-semibold text-danger">Delete Account</h2>
        <div className="mt-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-medium text-ink">Permanently remove your MoneyLens account and associated data.</p>
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsDeleteModalOpen(true)}
            className="!border-danger/40 !text-danger shrink-0"
          >
            Delete Account
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