import { useState, type FormEvent } from 'react';
import SettingsSection from './SettingsSection';
import Select from '../common/Select';
import Input from '../common/Input';
import Button from '../common/Button';
import type { FinancialPreferencesSettings } from '../../types/settings';

const CURRENCY_OPTIONS = [
  { label: 'NGN — Nigerian Naira (₦)', value: 'NGN — Nigerian Naira (₦)' },
  { label: 'USD — US Dollar ($)', value: 'USD — US Dollar ($)' },
  { label: 'GBP — British Pound (£)', value: 'GBP — British Pound (£)' },
  { label: 'EUR — Euro (€)', value: 'EUR — Euro (€)' },
];

const INCOME_OPTIONS = [
  'Below ₦100,000',
  '₦100,000 – ₦250,000',
  '₦250,000 – ₦500,000',
  '₦500,000 – ₦1,000,000',
  'Above ₦1,000,000',
  'Prefer not to say',
].map((v) => ({ label: v, value: v }));

const GOAL_OPTIONS = ['Save More', 'Reduce Spending', 'Pay Off Debt', 'Track Expenses', 'Build Emergency Fund', 'Invest More'].map((v) => ({
  label: v,
  value: v,
}));

interface FinancialPreferencesProps {
  preferences: FinancialPreferencesSettings;
  onSave: (updates: FinancialPreferencesSettings) => void;
}

export default function FinancialPreferences({ preferences, onSave }: FinancialPreferencesProps) {
  const [currency, setCurrency] = useState(preferences.currency);
  const [incomeRange, setIncomeRange] = useState(preferences.incomeRange);
  const [financialGoal, setFinancialGoal] = useState(preferences.financialGoal);
  const [savingsTarget, setSavingsTarget] = useState(String(preferences.monthlySavingsTarget));
  const [alertThreshold, setAlertThreshold] = useState(String(preferences.spendingAlertThreshold));
  const [errors, setErrors] = useState<{ savingsTarget?: string; alertThreshold?: string }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const savings = Number(savingsTarget);
    const threshold = Number(alertThreshold);
    const next: typeof errors = {};
    if (!savingsTarget || Number.isNaN(savings) || savings < 0) next.savingsTarget = 'Enter a valid amount.';
    if (!alertThreshold || Number.isNaN(threshold) || threshold < 0) next.alertThreshold = 'Enter a valid amount.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    onSave({ currency, incomeRange, financialGoal, monthlySavingsTarget: savings, spendingAlertThreshold: threshold });
  }

  return (
    <SettingsSection title="Financial Preferences" description="Tune how MoneyLens frames your money.">
      <form onSubmit={handleSubmit} className="space-y-5 py-1">
        <div>
          <label htmlFor="currency" className="mb-1.5 block text-sm font-medium text-ink">
            Currency
          </label>
          <Select id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} options={CURRENCY_OPTIONS} />
        </div>

        <div>
          <label htmlFor="incomeRange" className="mb-1.5 block text-sm font-medium text-ink">
            Income Range
          </label>
          <Select id="incomeRange" value={incomeRange} onChange={(e) => setIncomeRange(e.target.value)} options={INCOME_OPTIONS} />
        </div>

        <div>
          <label htmlFor="financialGoal" className="mb-1.5 block text-sm font-medium text-ink">
            Main Financial Goal
          </label>
          <Select id="financialGoal" value={financialGoal} onChange={(e) => setFinancialGoal(e.target.value)} options={GOAL_OPTIONS} />
        </div>

        <Input
          id="savingsTarget"
          label="Monthly Savings Target"
          type="number"
          inputMode="decimal"
          value={savingsTarget}
          onChange={(e) => setSavingsTarget(e.target.value)}
          error={errors.savingsTarget}
        />

        <Input
          id="alertThreshold"
          label="Spending Alert Threshold"
          type="number"
          inputMode="decimal"
          hint="Notify me when a transaction exceeds this amount."
          value={alertThreshold}
          onChange={(e) => setAlertThreshold(e.target.value)}
          error={errors.alertThreshold}
        />

        <div className="flex justify-end border-t border-line pt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </SettingsSection>
  );
}