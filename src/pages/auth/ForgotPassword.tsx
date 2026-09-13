import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import AuthSuccess from '../../components/auth/AuthSuccess';
import { IconArrowLeft } from '../../components/Icons';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

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
          {submitted ? (
            <AuthSuccess
              icon="📩"
              title="Check your email"
              message="If an account exists with this email address, password reset instructions have been sent."
              primaryLabel="Back to Login"
              onPrimary={() => navigate('/login')}
              secondary={
                <>
                  Didn't receive anything?{' '}
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="font-medium text-primary hover:text-primary-hover"
                  >
                    Try again
                  </button>
                </>
              }
            />
          ) : (
            <>
              <AuthHeader
                eyebrow="Password Recovery"
                title="Forgot your password?"
                subtext="Don't worry. Enter your email address and we'll help you reset your password."
              />
              <ForgotPasswordForm onSuccess={() => setSubmitted(true)} />
            </>
          )}
        </AuthCard>
      </div>
    </div>
  );
}