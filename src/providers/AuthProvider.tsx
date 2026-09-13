import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from '../hooks/useAuth';
import { authService } from '../services/authService';
import type { User } from '../types/user';

const TOKEN_KEY = 'moneylens_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    authService
      .me()
      .then(setUser)
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { user, token } = await authService.login({ email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const { user, token } = await authService.register({ name, email, password });
    localStorage.setItem(TOKEN_KEY, token);
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  }, []);

  const value: AuthContextValue = { user, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
