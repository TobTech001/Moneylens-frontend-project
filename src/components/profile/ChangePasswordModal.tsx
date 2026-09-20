import { useEffect, useState, type FormEvent } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import PasswordInput from '../auth/PasswordInput';
import PasswordStrength from '../auth/PasswordStrength';
import PasswordRequirements, { passwordMeetsAllRequirements } from '../auth/PasswordRequirements';

interface FormErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ChangePasswordModal({ isOpen, onClose, onSave }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
  }, [isOpen]);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!currentPassword) next.currentPassword = 'Current password is required.';
    if (!newPassword) next.newPassword = 'New password is required.';
    else if (!passwordMeetsAllRequirements(newPassword)) next.newPassword = 'Password does not meet all requirements yet.';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your new password.';
    else if (confirmPassword !== newPassword) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend-only — simulates a password change. No real auth call is made.
    setTimeout(() => {
      setIsSubmitting(false);
      onSave();
    }, 900);
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Change Password"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form="change-password-form" isLoading={isSubmitting} loadingText="Changing...">
            Change Password
          </Button>
        </>
      }
    >
      <form id="change-password-form" onSubmit={handleSubmit} noValidate className="space-y-4">
        <PasswordInput
          id="currentPassword"
          label="Current Password"
          autoComplete="current-password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
        />

        <div>
          <PasswordInput
            id="newPassword"
            label="New Password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            error={errors.newPassword}
          />
          <PasswordStrength password={newPassword} />
          <PasswordRequirements password={newPassword} />
        </div>

        <PasswordInput
          id="confirmPassword"
          label="Confirm New Password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
      </form>
    </Modal>
  );
}