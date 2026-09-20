import Badge from '../common/Badge';
import BorrowLendActionsMenu from './BorrowLendActionsMenu';
import { BORROW_LEND_STATUS_LABEL, type BorrowLendRecordWithStatus, type BorrowLendStatus } from '../../types/borrowLend';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<BorrowLendStatus, 'positive' | 'warning' | 'negative' | 'neutral'> = {
  paid: 'positive',
  'partially-paid': 'neutral',
  outstanding: 'neutral',
  overdue: 'negative',
};

interface BorrowLendTableProps {
  records: BorrowLendRecordWithStatus[];
  onView: (r: BorrowLendRecordWithStatus) => void;
  onAddPayment: (r: BorrowLendRecordWithStatus) => void;
  onEdit: (r: BorrowLendRecordWithStatus) => void;
  onDelete: (r: BorrowLendRecordWithStatus) => void;
}

export default function BorrowLendTable({ records, onView, onAddPayment, onEdit, onDelete }: BorrowLendTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-slate">
            <th scope="col" className="px-5 py-3.5 font-medium">Person</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Type</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Amount</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Paid</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Remaining</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Due Date</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
            <th scope="col" className="px-5 py-3.5 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {records.map((r) => (
            <tr key={r.id} className="cursor-pointer transition-colors hover:bg-surface-alt/60" onClick={() => onView(r)}>
              <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink">{r.person}</td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <Badge tone={r.type === 'lent' ? 'positive' : 'neutral'}>{r.type === 'lent' ? 'Lent' : 'Borrowed'}</Badge>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-ink">{formatNaira(r.amount)}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate">{formatNaira(r.paidAmount)}</td>
              <td className="whitespace-nowrap px-5 py-3.5 font-semibold text-ink">{formatNaira(r.remainingAmount)}</td>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate">{formatDate(r.dueDate)}</td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <Badge tone={STATUS_TONE[r.status]}>{BORROW_LEND_STATUS_LABEL[r.status]}</Badge>
              </td>
              <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <BorrowLendActionsMenu
                    onView={() => onView(r)}
                    onAddPayment={() => onAddPayment(r)}
                    onEdit={() => onEdit(r)}
                    onDelete={() => onDelete(r)}
                    showAddPayment={r.status !== 'paid'}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}