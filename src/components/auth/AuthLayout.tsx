import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import AuthBrandPanel from './AuthBrandPanel';
import Reveal from '../common/Reveal';
import { IconArrowLeft } from '../Icons';

interface AuthLayoutProps {
  brandHeadline: string;
  brandSubtext: string;
  children: ReactNode;
}

export default function AuthLayout({ brandHeadline, brandSubtext, children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen bg-bg lg:grid-cols-2">
      <AuthBrandPanel headline={brandHeadline} subtext={brandSubtext} />

      <div className="flex flex-col px-5 py-8 sm:px-10 sm:py-10 lg:px-14 lg:py-12 xl:px-20">
        <Reveal variant="fade-in">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-1.5 text-sm text-slate transition-colors hover:text-ink"
          >
            <IconArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Reveal>

        <div className="flex flex-1 items-center justify-center py-10 lg:py-0">
          <Reveal variant="fade-up" className="w-full max-w-sm">
            {children}
          </Reveal>
        </div>
      </div>
    </div>
  );
}