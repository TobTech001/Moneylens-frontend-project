import Modal from '../common/Modal';
import Button from '../common/Button';
import type { BorrowLendRecordWithStatus } from '../../types/borrowLend';

interface DeleteRecordModalProps {
  record: BorrowLendRecordWithStatus | null;
  onClose: () => void;
  onConfirm: (r: BorrowLendRecordWithStatus) => void;
}

export default function DeleteRecordModal({ record, onClose, onConfirm }: DeleteRecordModalProps) {
  if (!record) return null;

  return (
    <Modal
      isOpen={!!record}
      onClose={onClose}
      title="Delete this record?"
      size="sm"
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => onConfirm(record)}
            className="!border-danger/40 !bg-danger !text-white hover:!bg-danger/90"
          >
            Delete Record
          </Button>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-slate">
        Are you sure you want to delete this borrow or lend record for{' '}
        <span className="font-medium text-ink">{record.person}</span>? This action cannot be undone.
      </p>
    </Modal>
  );
}