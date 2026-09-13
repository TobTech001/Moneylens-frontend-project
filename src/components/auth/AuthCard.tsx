import type { ReactNode } from 'react';

export default function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="animate-[fadeIn_0.4s_ease-out] rounded-2xl border border-line bg-surface p-6 shadow-[0_30px_80px_-25px_rgba(0,0,0,0.6)] sm:p-8">
      {children}
    </div>
  );
}