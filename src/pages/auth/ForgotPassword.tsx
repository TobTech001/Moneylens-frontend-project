import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import AuthSuccess from '../../components/auth/AuthSuccess';
import { IconArrowLeft } from '../../components/Icons';
import { generateOtp, storeOtp } from '../../utils/otp';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [demoCode, setDemoCode] = useState<string | null>(null);

  function handleSubmitted(email: string) {
    // Frontend-only simulation — generates a code instead of actually emailing one.
    const code = generateOtp();
    storeOtp(email, code);
    setSubmittedEmail(email);
    setDemoCode(code);
  }

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
          {submittedEmail ? (
            <AuthSuccess
              icon="📩"
              title="Check your email"
              message={`We've sent a 6-digit verification code to ${submittedEmail}.${
                demoCode ? ` (Demo mode — your code is ${demoCode})` : ''
              }`}
              primaryLabel="Enter Verification Code"
              onPrimary={() => navigate(`/verify-otp?email=${encodeURIComponent(submittedEmail)}`)}
              secondary={
                <>
                  Wrong email?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedEmail(null);
                      setDemoCode(null);
                    }}
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
              <ForgotPasswordForm onSuccess={handleSubmitted} />
            </>
          )}
        </AuthCard>
      </div>
    </div>
  );
}