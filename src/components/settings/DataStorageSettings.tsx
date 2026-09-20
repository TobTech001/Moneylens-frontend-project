import { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import ClearDataModal from './ClearDataModal';
import { getSettings, getStorageUsage } from '../../data/SettingsData';
import { MOCK_TRANSACTIONS } from '../../data/TransactionData';
import { getBudgets } from '../../data/BudgetData';
import { MOCK_SUBSCRIPTIONS } from '../../data/SubscriptionData';
import { MOCK_RECORDS } from '../../data/BorrowLendData';

interface DataStorageSettingsProps {
  onExported: () => void;
  onDataCleared: () => void;
}

export default function DataStorageSettings({ onExported, onDataCleared }: DataStorageSettingsProps) {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const usage = getStorageUsage();

  function handleExport() {
    setIsExporting(true);
    // Frontend-only — bundles the current mock datasets into a downloadable JSON file. No backend involved.
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      settings: getSettings(),
      transactions: MOCK_TRANSACTIONS,
      budgets: getBudgets('month'),
      subscriptions: MOCK_SUBSCRIPTIONS,
      borrowLendRecords: MOCK_RECORDS,
    };

    setTimeout(() => {
      const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `moneylens-export-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setIsExporting(false);
      onExported();
    }, 600);
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">MoneyLens Data</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-xs text-slate">Transactions</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{usage.transactions}</p>
          </div>
          <div>
            <p className="text-xs text-slate">Budgets</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{usage.budgets}</p>
          </div>
          <div>
            <p className="text-xs text-slate">Subscriptions</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{usage.subscriptions}</p>
          </div>
          <div>
            <p className="text-xs text-slate">Borrow & Lend Records</p>
            <p className="mt-1 font-display text-xl font-semibold text-ink">{usage.borrowLendRecords}</p>
          </div>
        </div>
      </Card>

      <Card>
        <h2 className="font-display text-lg font-semibold text-ink">Export Financial Data</h2>
        <p className="mt-1 text-sm text-slate">Download a JSON snapshot of your current MoneyLens demo data.</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="secondary" onClick={handleExport} isLoading={isExporting} loadingText="Exporting...">
            Export My Data
          </Button>
        </div>
      </Card>

      <Card className="!border-danger/25">
        <h2 className="font-display text-lg font-semibold text-danger">Clear Local Data</h2>
        <p className="mt-1 text-sm text-slate">Remove MoneyLens demo data stored in this browser.</p>
        <div className="mt-4 flex justify-end">
          <Button type="button" variant="secondary" onClick={() => setIsClearModalOpen(true)} className="!border-danger/40 !text-danger">
            Clear Data
          </Button>
        </div>
      </Card>

      <ClearDataModal
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={() => {
          setIsClearModalOpen(false);
          onDataCleared();
        }}
      />
    </div>
  );
}