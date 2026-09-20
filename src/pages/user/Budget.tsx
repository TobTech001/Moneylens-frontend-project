import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button';
import ErrorState from '../../components/common/ErrorState';
import Toast from '../../components/common/Toast';
import SubscriptionSummary from '../../components/subscriptions/SubscriptionSummary';
import SubscriptionOverview from '../../components/subscriptions/SubscriptionOverview';
import SubscriptionToolbar, {
  type CategoryFilter,
  type FrequencyFilter,
  type StatusFilter,
} from '../../components/subscriptions/SubscriptionToolbar';
import SubscriptionList from '../../components/subscriptions/SubscriptionList';
import SubscriptionDetails from '../../components/subscriptions/SubscriptionDetails';
import AddSubscriptionModal from '../../components/subscriptions/AddSubscriptionModal';
import EditSubscriptionModal from '../../components/subscriptions/EditSubscriptionModal';
import PauseSubscriptionModal from '../../components/subscriptions/PauseSubscriptionModal';
import CancelSubscriptionModal from '../../components/subscriptions/CancelSubscriptionModal';
import DeleteSubscriptionModal from '../../components/subscriptions/DeleteSubscriptionModal';
import UpcomingPayments from '../../components/subscriptions/UpcomingPayments';
import SubscriptionCostBreakdown from '../../components/subscriptions/SubscriptionCostBreakdown';
import SubscriptionInsights from '../../components/subscriptions/SubscriptionInsights';
import { MOCK_SUBSCRIPTIONS } from '../../data/SubscriptionData';
import type { NewSubscriptionInput, Subscription } from '../../types/subscription';

export default function Subscriptions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [frequency, setFrequency] = useState<FrequencyFilter>('all');

  const [viewingSub, setViewingSub] = useState<Subscription | null>(null);
  const [editingSub, setEditingSub] = useState<Subscription | null>(null);
  const [pausingSub, setPausingSub] = useState<Subscription | null>(null);
  const [cancellingSub, setCancellingSub] = useState<Subscription | null>(null);
  const [deletingSub, setDeletingSub] = useState<Subscription | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

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

  function load() {
    setIsLoading(true);
    setHasError(false);
    // Frontend-only — simulates a fetch. Swap this for a real service call once the backend exists.
    setTimeout(() => {
      setSubscriptions(MOCK_SUBSCRIPTIONS);
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

  const filteredSubscriptions = useMemo(() => {
    const query = search.trim().toLowerCase();
    return subscriptions.filter((s) => {
      const matchesSearch = !query || s.serviceName.toLowerCase().includes(query) || s.category.toLowerCase().includes(query);
      const matchesStatus = status === 'all' || s.status === status;
      const matchesCategory = category === 'all' || s.category === category;
      const matchesFrequency = frequency === 'all' || s.frequency === frequency;
      return matchesSearch && matchesStatus && matchesCategory && matchesFrequency;
    });
  }, [subscriptions, search, status, category, frequency]);

  const hasActiveFilters = !!search || status !== 'all' || category !== 'all' || frequency !== 'all';

  function clearFilters() {
    setSearch('');
    setStatus('all');
    setCategory('all');
    setFrequency('all');
  }

  function handleAdd(input: NewSubscriptionInput) {
    const newSub: Subscription = { ...input, id: `sub-${Date.now()}`, createdAt: new Date().toISOString().slice(0, 10) };
    setSubscriptions((prev) => [newSub, ...prev]);
    setIsAddModalOpen(false);
    setToastMessage('Subscription added successfully.');
  }

  function handleSaveEdit(id: string, updates: Partial<Subscription>) {
    setSubscriptions((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
    setEditingSub(null);
    setToastMessage('Subscription updated successfully.');
  }

  function handleConfirmPause(s: Subscription) {
    setSubscriptions((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: 'paused' } : x)));
    setPausingSub(null);
    setToastMessage('Subscription paused successfully.');
  }

  function handleConfirmCancel(s: Subscription) {
    setSubscriptions((prev) => prev.map((x) => (x.id === s.id ? { ...x, status: 'cancelled' } : x)));
    setCancellingSub(null);
    setToastMessage('Subscription cancelled successfully.');
  }

  function handleConfirmDelete(s: Subscription) {
    setSubscriptions((prev) => prev.filter((x) => x.id !== s.id));
    setDeletingSub(null);
    setToastMessage('Subscription deleted successfully.');
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-ink">Subscriptions</h1>
          <p className="mt-1 text-sm text-slate">Track recurring payments and never lose sight of what you're paying for.</p>
        </div>
        <Button type="button" onClick={() => setIsAddModalOpen(true)}>
          + Add Subscription
        </Button>
      </div>

      {hasError ? (
        <ErrorState message="We couldn't load your subscriptions." onRetry={load} />
      ) : (
        <>
          <SubscriptionSummary subscriptions={subscriptions} isLoading={isLoading} />

          <SubscriptionOverview subscriptions={subscriptions} isLoading={isLoading} />

          <UpcomingPayments subscriptions={subscriptions} isLoading={isLoading} onViewDetails={setViewingSub} />

          <SubscriptionInsights subscriptions={subscriptions} isLoading={isLoading} />

          <div>
            <h2 className="font-display text-lg font-semibold text-ink">Your Subscriptions</h2>
            <div className="mt-4 space-y-4">
              <SubscriptionToolbar
                search={search}
                onSearchChange={setSearch}
                status={status}
                onStatusChange={setStatus}
                category={category}
                onCategoryChange={setCategory}
                frequency={frequency}
                onFrequencyChange={setFrequency}
                hasActiveFilters={hasActiveFilters}
                onClearFilters={clearFilters}
              />

              <SubscriptionList
                subscriptions={filteredSubscriptions}
                isLoading={isLoading}
                hasAnySubscriptions={subscriptions.length > 0}
                onView={setViewingSub}
                onEdit={setEditingSub}
                onPause={setPausingSub}
                onCancel={setCancellingSub}
                onDelete={setDeletingSub}
                onAdd={() => setIsAddModalOpen(true)}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          <SubscriptionCostBreakdown subscriptions={subscriptions} isLoading={isLoading} />
        </>
      )}

      <SubscriptionDetails
        subscription={viewingSub}
        onClose={() => setViewingSub(null)}
        onEdit={(s) => {
          setViewingSub(null);
          setEditingSub(s);
        }}
        onPause={(s) => {
          setViewingSub(null);
          setPausingSub(s);
        }}
        onCancel={(s) => {
          setViewingSub(null);
          setCancellingSub(s);
        }}
        onDelete={(s) => {
          setViewingSub(null);
          setDeletingSub(s);
        }}
      />

      <AddSubscriptionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSave={handleAdd} />

      <EditSubscriptionModal subscription={editingSub} onClose={() => setEditingSub(null)} onSave={handleSaveEdit} />

      <PauseSubscriptionModal subscription={pausingSub} onClose={() => setPausingSub(null)} onConfirm={handleConfirmPause} />

      <CancelSubscriptionModal subscription={cancellingSub} onClose={() => setCancellingSub(null)} onConfirm={handleConfirmCancel} />

      <DeleteSubscriptionModal subscription={deletingSub} onClose={() => setDeletingSub(null)} onConfirm={handleConfirmDelete} />

      {toastMessage && <Toast message={toastMessage} />}
    </div>
  );
}