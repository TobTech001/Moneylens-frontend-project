import Modal from '../common/Modal';
import Button from '../common/Button';

interface ClearDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearDataModal({ isOpen, onClose, onConfirm }: ClearDataModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Are you sure?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={onConfirm} className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90">
            Clear Data
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        This will remove your locally stored MoneyLens demo data from this browser. This action cannot be undone.
      </p>
    </Modal>
  );
}