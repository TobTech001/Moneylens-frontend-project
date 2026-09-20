import { useEffect, useMemo, useState } from 'react';
import Button from '../../components/common/Button';
import Skeleton from '../../components/common/Skeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Toast from '../../components/common/Toast';
import BorrowLendSummary from '../../components/borrow-lend/BorrowLendSummary';
import BorrowLendTabs, { type BorrowLendTab } from '../../components/borrow-lend/BorrowLendTabs';
import BorrowLendToolbar, {
  type DateFilter,
  type StatusFilter,
  type TypeFilter,
} from '../../components/borrow-lend/BorrowLendToolbar';
import BorrowLendTable from '../../components/borrow-lend/BorrowLendTable';
import BorrowLendCard from '../../components/borrow-lend/BorrowLendCard';
import BorrowLendDetails from '../../components/borrow-lend/BorrowLendDetails';
import AddRecordModal from '../../components/borrow-lend/AddRecordModal';
import EditRecordModal from '../../components/borrow-lend/EditRecordModal';
import AddPaymentModal from '../../components/borrow-lend/AddPaymentModal';
import DeleteRecordModal from '../../components/borrow-lend/DeleteRecordModal';
import UpcomingPayments from '../../components/borrow-lend/UpcomingPayments';
import OverduePayments from '../../components/borrow-lend/OverduePayments';
import BorrowLendInsights from '../../components/borrow-lend/BorrowLendInsights';
import { MOCK_RECORDS } from '../../data/BorrowLendData';
import { withRecordStatus, type BorrowLendRecord, type BorrowLendRecordWithStatus, type NewRecordInput } from '../../types/borrowLend';

function matchesDateFilter(dateISO: string, filter: DateFilter, customDate: string): boolean {
  if (filter === 'all') return true;
  const d = new Date(dateISO + 'T00:00:00');
  const now = new Date();

  if (filter === 'today') return d.toDateString() === now.toDateString();
  if (filter === 'week') {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo && d <= now;
  }
  if (filter === 'month') return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  if (filter === 'lastMonth') {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
  }
  if (filter === 'custom') return !!customDate && dateISO === customDate;
  return true;
}

export default function BorrowLend() {
  const [records, setRecords] = useState<BorrowLendRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [activeTab, setActiveTab] = useState<BorrowLendTab>('all');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [type, setType] = useState<TypeFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customDate, setCustomDate] = useState('');

  const [viewingRecord, setViewingRecord] = useState<BorrowLendRecordWithStatus | null>(null);
  const [editingRecord, setEditingRecord] = useState<BorrowLendRecordWithStatus | null>(null);
  const [payingRecord, setPayingRecord] = useState<BorrowLendRecordWithStatus | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<BorrowLendRecordWithStatus | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function load() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch. Swap this for a real service call once the backend exists.
    setTimeout(() => {
      setRecords(MOCK_RECORDS);
      setIsLoading(false);
    }, 800);
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const recordsWithStatus = useMemo(() => records.map((r) => withRecordStatus(r)), [records]);

  const filteredRecords = useMemo(() => {
    const query = search.trim().toLowerCase();
    return recordsWithStatus.filter((r) => {
      const matchesTab =
        activeTab === 'all' ||
        (activeTab === 'lent' && r.type === 'lent') ||
        (activeTab === 'borrowed' && r.type === 'borrowed') ||
        (activeTab === 'outstanding' && r.status !== 'paid') ||
        (activeTab === 'completed' && r.status === 'paid');
      const matchesSearch = !query || r.person.toLowerCase().includes(query) || r.description.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || r.status === status;
      const matchesType = type === 'all' || r.type === type;
      const matchesDate = matchesDateFilter(r.date, dateFilter, customDate);
      return matchesTab && matchesSearch && matchesStatus && matchesType && matchesDate;
    });
  }, [recordsWithStatus, activeTab, search, status, type, dateFilter, customDate]);

  const hasActiveFilters = !!search || status !== 'all' || type !== 'all' || dateFilter !== 'all';

  function clearFilters() {
    setSearch('');
    setStatus('all');
    setType('all');
    setDateFilter('all');
    setCustomDate('');
  }

  function handleAddRecord(input: NewRecordInput) {
    const newRecord: BorrowLendRecord = { ...input, id: `bl-${Date.now()}`, paidAmount: 0, payments: [] };
    setRecords((prev) => [newRecord, ...prev]);
    setIsAddModalOpen(false);
    setToastMessage('Record added successfully.');
  }

  function handleSaveEdit(id: string, updates: Partial<BorrowLendRecord>) {
    setRecords((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
    setEditingRecord(null);
    setToastMessage('Record updated successfully.');
  }

  function handleAddPayment(recordId: string, amount: number, date: string, note?: string) {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === recordId
          ? {
              ...r,
              paidAmount: r.paidAmount + amount,
              payments: [...r.payments, { id: `pay-${Date.now()}`, recordId, amount, date, note }],
            }
          : r,
      ),
    );
    setPayingRecord(null);
    setToastMessage('Payment recorded successfully.');
  }

  function handleConfirmDelete(r: BorrowLendRecordWithStatus) {
    setRecords((prev) => prev.filter((x) => x.id !== r.id));
    setDeletingRecord(null);
    setToastMessage('Record deleted successfully.');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Borrow & Lend</h1>
          <p className="mt-1 text-sm text-slate">Keep track of money you've borrowed or lent to others.</p>
        </div>
        <Button type="button" onClick={() => setIsAddModalOpen(true)}>
          + Add Record
        </Button>
      </div>

      {hasError ? (
        <ErrorState message="We couldn't load your borrow and lend records." onRetry={load} />
      ) : (
        <>
          <BorrowLendSummary records={recordsWithStatus} isLoading={isLoading} />

          <UpcomingPayments records={recordsWithStatus} isLoading={isLoading} onViewDetails={setViewingRecord} />
          <OverduePayments records={recordsWithStatus} isLoading={isLoading} onViewDetails={setViewingRecord} />
          <BorrowLendInsights records={recordsWithStatus} isLoading={isLoading} />

          <BorrowLendTabs active={activeTab} onChange={setActiveTab} />

          <BorrowLendToolbar
            search={search}
            onSearchChange={setSearch}
            status={status}
            onStatusChange={setStatus}
            type={type}
            onTypeChange={setType}
            dateFilter={dateFilter}
            onDateFilterChange={setDateFilter}
            customDate={customDate}
            onCustomDateChange={setCustomDate}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
          />

          {isLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : records.length === 0 ? (
            <EmptyState
              icon="🤝"
              title="Nothing to track yet"
              message="Add money you've borrowed or lent to keep track of repayments."
              action={
                <Button type="button" onClick={() => setIsAddModalOpen(true)}>
                  + Add Record
                </Button>
              }
            />
          ) : filteredRecords.length === 0 ? (
            <EmptyState icon="🔍" title="No matching records" message="Try changing your search or filters." action={<Button type="button" variant="secondary" onClick={clearFilters}>Clear Filters</Button>} />
          ) : (
            <>
              <BorrowLendTable
                records={filteredRecords}
                onView={setViewingRecord}
                onAddPayment={setPayingRecord}
                onEdit={setEditingRecord}
                onDelete={setDeletingRecord}
              />
              <div className="space-y-3 lg:hidden">
                {filteredRecords.map((r) => (
                  <BorrowLendCard
                    key={r.id}
                    record={r}
                    onView={setViewingRecord}
                    onAddPayment={setPayingRecord}
                    onEdit={setEditingRecord}
                    onDelete={setDeletingRecord}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}

      <BorrowLendDetails
        record={viewingRecord}
        onClose={() => setViewingRecord(null)}
        onAddPayment={(r) => {
          setViewingRecord(null);
          setPayingRecord(r);
        }}
        onEdit={(r) => {
          setViewingRecord(null);
          setEditingRecord(r);
        }}
        onDelete={(r) => {
          setViewingRecord(null);
          setDeletingRecord(r);
        }}
      />

      <AddRecordModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAddRecord} />

      <EditRecordModal record={editingRecord} onClose={() => setEditingRecord(null)} onSave={handleSaveEdit} />

      <AddPaymentModal record={payingRecord} onClose={() => setPayingRecord(null)} onSave={handleAddPayment} />

      <DeleteRecordModal record={deletingRecord} onClose={() => setDeletingRecord(null)} onConfirm={handleConfirmDelete} />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}