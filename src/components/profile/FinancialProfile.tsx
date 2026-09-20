import { useEffect, useState, type FormEvent } from 'react';
import Card from '../common/Card';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import Skeleton from '../common/Skeleton';
import { FINANCIAL_GOALS, INCOME_RANGES, type FinancialProfile as FinancialProfileType } from '../../types/profile';

const INCOME_OPTIONS = INCOME_RANGES.map((v) => ({ label: v, value: v }));
const GOAL_OPTIONS = FINANCIAL_GOALS.map((v) => ({ label: v, value: v }));

interface FormErrors {
  savingTarget?: string;
}

interface FinancialProfileProps {
  financialProfile: FinancialProfileType;
  isLoading?: boolean;
  onSave: (updates: Partial<FinancialProfileType>) => void;
}

export default function FinancialProfile({ financialProfile, isLoading, onSave }: FinancialProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [incomeRange, setIncomeRange] = useState(financialProfile.incomeRange);
  const [financialGoal, setFinancialGoal] = useState(financialProfile.financialGoal);
  const [savingTarget, setSavingTarget] = useState(String(financialProfile.savingTarget));
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    setIncomeRange(financialProfile.incomeRange);
    setFinancialGoal(financialProfile.financialGoal);
    setSavingTarget(String(financialProfile.savingTarget));
  }, [financialProfile]);

  if (isLoading) {
    return (
      <Card>
        <Skeleton className="h-4 w-40" />
        <div className="mt-5 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      </Card>
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const amount = Number(savingTarget);
    if (!savingTarget || Number.isNaN(amount) || amount <= 0) {
      setErrors({ savingTarget: 'Saving target must be greater than 0.' });
      return;
    }
    setErrors({});
    onSave({ incomeRange, financialGoal, savingTarget: amount });
    setIsEditing(false);
  }

  function handleCancel() {
    setIncomeRange(financialProfile.incomeRange);
    setFinancialGoal(financialProfile.financialGoal);
    setSavingTarget(String(financialProfile.savingTarget));
    setErrors({});
    setIsEditing(false);
  }

  return (
    <Card>
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink">Financial Profile</h2>
        {!isEditing && (
          <button type="button" onClick={() => setIsEditing(true)} className="text-xs font-medium text-primary hover:text-primary-hover">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <Input id="currency" label="Preferred Currency" type="text" value={financialProfile.currency} disabled />
          <Select
            id="incomeRange"
            label="Monthly Income Range"
            value={incomeRange}
            onChange={(e) => setIncomeRange(e.target.value as FinancialProfileType['incomeRange'])}
            options={INCOME_OPTIONS}
          />
          <Select
            id="financialGoal"
            label="Main Financial Goal"
            value={financialGoal}
            onChange={(e) => setFinancialGoal(e.target.value as FinancialProfileType['financialGoal'])}
            options={GOAL_OPTIONS}
          />
          <Input id="savingTarget" label="Saving Target" type="number" inputMode="decimal" value={savingTarget} onChange={(e) => setSavingTarget(e.target.value)} error={errors.savingTarget} />

          <div className="flex justify-end gap-3 border-t border-line pt-4">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      ) : (
        <dl className="mt-5 space-y-3.5">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate">Preferred Currency</dt>
            <dd className="text-sm font-medium text-ink">{financialProfile.currency}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate">Monthly Income Range</dt>
            <dd className="text-sm font-medium text-ink">{financialProfile.incomeRange}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate">Main Financial Goal</dt>
            <dd className="text-sm font-medium text-ink">{financialProfile.financialGoal}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-sm text-slate">Saving Target</dt>
            <dd className="text-sm font-medium text-ink">₦{financialProfile.savingTarget.toLocaleString('en-NG')}</dd>
          </div>
        </dl>
      )}
    </Card>
  );
}