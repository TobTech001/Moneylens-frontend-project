import Modal from '../common/Modal';
import Button from '../common/Button';

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
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
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete Account
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        This action cannot be undone. Your account and associated MoneyLens data will be permanently removed.
      </p>
    </Modal>
  );
}