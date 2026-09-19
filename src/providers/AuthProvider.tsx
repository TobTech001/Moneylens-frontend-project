import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthContextValue } from '../hooks/useAuth';
import type { User } from '../types/user';

// Frontend-only for now — no backend exists yet, so this simulates a session
// by storing a demo user in localStorage instead of calling authService and
// validating a real token. Swap the bodies of login/register/the mount
// effect below for real authService calls once the backend is ready.
const USER_KEY = 'moneylens_demo_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored) as User);
      } catch {
        localStorage.removeItem(USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, _password: string) => {
    const demoUser: User = {
      id: 'demo-user',
      name: email.split('@')[0] || 'User',
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const register = useCallback(async (name: string, email: string, _password: string) => {
    const demoUser: User = {
      id: 'demo-user',
      name,
      email,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USER_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  const value: AuthContextValue = { user, isLoading, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}