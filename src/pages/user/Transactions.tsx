import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Skeleton from '../../components/common/Skeleton';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';
import Toast from '../../components/common/Toast';
import TransactionSummary from '../../components/transactions/TransactionSummary';
import TransactionToolbar from '../../components/transactions/TransactionToolbar';
import TransactionTable from '../../components/transactions/TransactionTable';
import TransactionCard from '../../components/transactions/TransactionCard';
import TransactionDetails from '../../components/transactions/TransactionDetails';
import AddTransactionModal from '../../components/transactions/AddTransactionModal';
import ImportTransactions from '../../components/transactions/ImportTransactions';
import DeleteConfirmModal from '../../components/transactions/DeleteConfirmModal';
import { MOCK_TRANSACTIONS } from '../../data/TransactionData';
import type { NewTransactionInput, Transaction } from '../../types/transaction';

export type TypeFilter = 'all' | 'income' | 'expense';
export type DateFilter = 'all' | 'today' | 'week' | 'month' | 'lastMonth' | 'custom';

const PAGE_SIZE = 6;

function matchesDateFilter(dateISO: string, filter: DateFilter, customDate: string): boolean {
  if (filter === 'all') return true;

  const d = new Date(dateISO + 'T00:00:00');
  const now = new Date();

  if (filter === 'today') {
    return d.toDateString() === now.toDateString();
  }
  if (filter === 'week') {
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    return d >= weekAgo && d <= now;
  }
  if (filter === 'month') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }
  if (filter === 'lastMonth') {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
  }
  if (filter === 'custom') {
    return !!customDate && dateISO === customDate;
  }
  return true;
}

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [type, setType] = useState<TypeFilter>('all');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [customDate, setCustomDate] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const [viewingTransaction, setViewingTransaction] = useState<Transaction | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [deletingTransaction, setDeletingTransaction] = useState<Transaction | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    if (searchParams.get('add') === '1') {
      setIsAddModalOpen(true);
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete('add');
        return next;
      }, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  function loadTransactions() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch. Swap this for transactionService.list() once the backend exists.
    setTimeout(() => {
      setTransactions(MOCK_TRANSACTIONS);
      setIsLoading(false);
    }, 900);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((t) => {
      const matchesSearch =
        !query ||
        t.merchant.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || t.category === category;
      const matchesType = type === 'all' || t.type === type;
      const matchesDate = matchesDateFilter(t.date, dateFilter, customDate);
      return matchesSearch && matchesCategory && matchesType && matchesDate;
    });
  }, [transactions, search, category, type, dateFilter, customDate]);

  const visibleTransactions = filteredTransactions.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTransactions.length;

  const hasActiveFilters = !!search || category !== 'all' || type !== 'all' || dateFilter !== 'all';

  function clearFilters() {
    setSearch('');
    setCategory('all');
    setType('all');
    setDateFilter('all');
    setCustomDate('');
    setVisibleCount(PAGE_SIZE);
  }

  function handleSaveTransaction(input: NewTransactionInput) {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) => (t.id === editingTransaction.id ? { ...editingTransaction, ...input } : t)),
      );
      setToastMessage('Transaction updated.');
    } else {
      const newTransaction: Transaction = {
        ...input,
        id: `txn-${Date.now()}`,
        status: 'completed',
      };
      setTransactions((prev) => [newTransaction, ...prev]);
      setToastMessage('Transaction added.');
    }
    setIsAddModalOpen(false);
    setEditingTransaction(null);
  }

  function handleConfirmDelete(t: Transaction) {
    setTransactions((prev) => prev.filter((x) => x.id !== t.id));
    setDeletingTransaction(null);
    setToastMessage('Transaction deleted.');
  }

  function handleImported(count: number) {
    setToastMessage(count === 1 ? '1 transaction imported.' : `${count} transactions imported.`);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Transactions</h1>
          <p className="mt-1 text-sm text-slate">View and manage all your income and spending in one place.</p>
        </div>
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={() => setIsImportModalOpen(true)}>
            Import Transactions
          </Button>
          <Button
            type="button"
            onClick={() => {
              setEditingTransaction(null);
              setIsAddModalOpen(true);
            }}
          >
            + Add Transaction
          </Button>
        </div>
      </div>

      <TransactionSummary transactions={transactions} isLoading={isLoading} />

      <TransactionToolbar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setVisibleCount(PAGE_SIZE);
        }}
        category={category}
        onCategoryChange={(v) => {
          setCategory(v);
          setVisibleCount(PAGE_SIZE);
        }}
        type={type}
        onTypeChange={(v) => {
          setType(v);
          setVisibleCount(PAGE_SIZE);
        }}
        dateFilter={dateFilter}
        onDateFilterChange={(v) => {
          setDateFilter(v);
          setVisibleCount(PAGE_SIZE);
        }}
        customDate={customDate}
        onCustomDateChange={(v) => {
          setCustomDate(v);
          setVisibleCount(PAGE_SIZE);
        }}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      {isLoading ? (
        <Card>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
              </div>
            ))}
          </div>
        </Card>
      ) : hasError ? (
        <ErrorState message="We couldn't load your transactions." onRetry={loadTransactions} />
      ) : transactions.length === 0 ? (
        <EmptyState
          icon="🧾"
          title="No transactions yet"
          message="Your transactions will appear here once you add them."
          action={
            <Button type="button" onClick={() => setIsAddModalOpen(true)}>
              + Add Transaction
            </Button>
          }
        />
      ) : filteredTransactions.length === 0 ? (
        <EmptyState
          icon="🔍"
          title="No matching transactions"
          message="Try changing your search or filters."
          action={
            <Button type="button" variant="secondary" onClick={clearFilters}>
              Clear Filters
            </Button>
          }
        />
      ) : (
        <>
          <TransactionTable
            transactions={visibleTransactions}
            onView={setViewingTransaction}
            onEdit={(t) => {
              setEditingTransaction(t);
              setIsAddModalOpen(true);
            }}
            onDelete={setDeletingTransaction}
          />

          <div className="space-y-3 lg:hidden">
            {visibleTransactions.map((t) => (
              <TransactionCard
                key={t.id}
                transaction={t}
                onView={setViewingTransaction}
                onEdit={(tx) => {
                  setEditingTransaction(tx);
                  setIsAddModalOpen(true);
                }}
                onDelete={setDeletingTransaction}
              />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center">
              <Button type="button" variant="secondary" onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}>
                Load More
              </Button>
            </div>
          )}
        </>
      )}

      <TransactionDetails
        transaction={viewingTransaction}
        onClose={() => setViewingTransaction(null)}
        onEdit={(t) => {
          setViewingTransaction(null);
          setEditingTransaction(t);
          setIsAddModalOpen(true);
        }}
        onDelete={(t) => {
          setViewingTransaction(null);
          setDeletingTransaction(t);
        }}
      />

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTransaction(null);
        }}
        onSave={handleSaveTransaction}
        editingTransaction={editingTransaction}
      />

      <ImportTransactions
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImported={handleImported}
      />

      <DeleteConfirmModal
        transaction={deletingTransaction}
        onClose={() => setDeletingTransaction(null)}
        onConfirm={handleConfirmDelete}
      />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}