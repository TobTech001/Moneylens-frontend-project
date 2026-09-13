import { useCallback, useEffect, useState } from 'react';
import { budgetService } from '../services/budgetService';
import type { Budget } from '../types/budget';

export function useBudget() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await budgetService.list();
      setBudgets(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load budgets');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { budgets, isLoading, error, refetch };
}
