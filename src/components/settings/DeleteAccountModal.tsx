import { useEffect, useState } from 'react';
import Modal from '../common/Modal';
import Input from '../common/Input';
import Button from '../common/Button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CONFIRM_WORD = 'DELETE';

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('');

  useEffect(() => {
    if (isOpen) setConfirmText('');
  }, [isOpen]);

  const canDelete = confirmText.trim() === CONFIRM_WORD;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete your account?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={onConfirm}
            disabled={!canDelete}
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete Account
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        This action cannot be undone. Your MoneyLens account and associated data will be permanently removed.
      </p>
      <div className="mt-4">
        <Input
          id="delete-confirm"
          label={`Type ${CONFIRM_WORD} to confirm`}
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder={CONFIRM_WORD}
        />
      </div>
    </Modal>
  );
}