import Modal from '../common/Modal';
import Button from '../common/Button';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TwoFactorModal({ isOpen, onClose }: TwoFactorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Two-Factor Authentication" size="sm" footer={<Button type="button" onClick={onClose}>Got it</Button>}>
      <p className="text-sm leading-relaxed text-slate">
        Two-factor authentication will be available when the MoneyLens backend authentication system is implemented.
      </p>
    </Modal>
  );
}