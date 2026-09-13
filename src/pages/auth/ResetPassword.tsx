import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import ResetPasswordForm from '../../components/auth/ResetPasswordForm';
import AuthSuccess from '../../components/auth/AuthSuccess';
import { IconArrowLeft } from '../../components/Icons';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-bg px-5 py-12">
      <div
        className="pointer-events-none absolute -left-32 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-28 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-[120px]"
        aria-hidden
      />

      <Link
        to="/login"
        className="absolute left-5 top-6 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-ink sm:left-8 sm:top-8"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back to Login
      </Link>

      <div className="mb-8">
        <AuthLogo />
      </div>

      <div className="w-full max-w-sm">
        <AuthCard>
          {success ? (
            <AuthSuccess
              icon="🎉"
              title="Password updated successfully"
              message="Your password has been successfully updated. You can now log in to your MoneyLens account."
              primaryLabel="Continue to Login"
              onPrimary={() => navigate('/login')}
            />
          ) : (
            <>
              <AuthHeader
                eyebrow="Create New Password"
                title="Set a new password"
                subtext="Choose a strong password to keep your MoneyLens account secure."
              />
              <ResetPasswordForm onSuccess={() => setSuccess(true)} />
            </>
          )}
        </AuthCard>
      </div>
    </div>
  );
}