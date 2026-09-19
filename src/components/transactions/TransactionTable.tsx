import Badge from '../common/Badge';
import TransactionActionsMenu from './TransactionMenu';
import { CATEGORY_ICONS } from '../../data/TransactionData';
import type { Transaction, TransactionStatus } from '../../types/transaction';

function formatNaira(n: number, type: Transaction['type']) {
  const sign = type === 'income' ? '+' : '-';
  return `${sign}₦${n.toLocaleString('en-NG')}`;
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_TONE: Record<TransactionStatus, 'positive' | 'warning' | 'negative'> = {
  completed: 'positive',
  pending: 'warning',
  failed: 'negative',
};

interface TransactionTableProps {
  transactions: Transaction[];
  onView: (t: Transaction) => void;
  onEdit: (t: Transaction) => void;
  onDelete: (t: Transaction) => void;
}

export default function TransactionTable({ transactions, onView, onEdit, onDelete }: TransactionTableProps) {
  return (
    <div className="hidden overflow-x-auto rounded-2xl border border-line bg-surface lg:block">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-line text-xs text-slate">
            <th scope="col" className="px-5 py-3.5 font-medium">Date</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Description</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Category</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Type</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Amount</th>
            <th scope="col" className="px-5 py-3.5 font-medium">Status</th>
            <th scope="col" className="px-5 py-3.5 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {transactions.map((t) => (
            <tr key={t.id} className="cursor-pointer transition-colors hover:bg-surface-alt/60" onClick={() => onView(t)}>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate">{formatDate(t.date)}</td>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{CATEGORY_ICONS[t.category] ?? '📦'}</span>
                  <span className="font-medium text-ink">{t.merchant}</span>
                </div>
              </td>
              <td className="whitespace-nowrap px-5 py-3.5 text-slate">{t.category}</td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <Badge tone={t.type === 'income' ? 'positive' : 'neutral'}>{t.type === 'income' ? 'Income' : 'Expense'}</Badge>
              </td>
              <td className={`whitespace-nowrap px-5 py-3.5 font-semibold ${t.type === 'income' ? 'text-primary' : 'text-ink'}`}>
                {formatNaira(t.amount, t.type)}
              </td>
              <td className="whitespace-nowrap px-5 py-3.5">
                <Badge tone={STATUS_TONE[t.status]}>{t.status[0].toUpperCase() + t.status.slice(1)}</Badge>
              </td>
              <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end">
                  <TransactionActionsMenu onView={() => onView(t)} onEdit={() => onEdit(t)} onDelete={() => onDelete(t)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}