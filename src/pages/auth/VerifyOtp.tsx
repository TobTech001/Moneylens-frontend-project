import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLogo from '../../components/auth/AuthLogo';
import AuthCard from '../../components/auth/AuthCard';
import AuthHeader from '../../components/auth/AuthHeader';
import OtpInput from './OtpInput';
import Button from '../../components/common/Button';
import { IconArrowLeft } from '../../components/Icons';
import { generateOtp, getStoredOtp, storeOtp, clearOtp, markOtpVerified } from '../../utils/otp';

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_SECONDS = 30;

export default function VerifyOtp() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [demoCode, setDemoCode] = useState<string | null>(() => {
    const stored = getStoredOtp();
    return stored?.email === email ? stored.code : null;
  });
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (code.length < 6) {
      setError('Enter the full 6-digit code.');
      return;
    }

    setIsVerifying(true);
    // Frontend-only — compares against the code simulated in ForgotPasswordForm/sessionStorage.
    setTimeout(() => {
      const stored = getStoredOtp();
      const isExpired = !stored || Date.now() - stored.createdAt > OTP_TTL_MS;
      const isMatch = stored && stored.email === email && stored.code === code;

      if (!stored || isExpired) {
        setError('This code has expired. Request a new one below.');
        setIsVerifying(false);
        return;
      }
      if (!isMatch) {
        setError('Incorrect verification code. Please try again.');
        setIsVerifying(false);
        return;
      }

      clearOtp();
      markOtpVerified();
      setIsVerifying(false);
      navigate('/reset-password');
    }, 700);
  }

  function handleResend() {
    if (resendCooldown > 0 || !email) return;
    const newCode = generateOtp();
    storeOtp(email, newCode);
    setDemoCode(newCode);
    setCode('');
    setError(null);
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
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
        to="/forgot-password"
        className="absolute left-5 top-6 inline-flex items-center gap-1.5 text-sm text-slate transition-colors hover:text-ink sm:left-8 sm:top-8"
      >
        <IconArrowLeft className="h-4 w-4" />
        Back
      </Link>

      <div className="mb-8">
        <AuthLogo />
      </div>

      <div className="w-full max-w-sm">
        <AuthCard>
          <AuthHeader
            eyebrow="Password Recovery"
            title="Enter verification code"
            subtext={email ? `We sent a 6-digit code to ${email}.` : 'Enter the 6-digit code we sent to your email.'}
          />

          {demoCode && (
            <div className="mb-5 rounded-lg border border-primary/25 bg-primary-tint px-3.5 py-2.5 text-xs text-ink">
              Demo mode — no real email is sent. Your code is{' '}
              <span className="font-semibold text-primary">{demoCode}</span>.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <OtpInput value={code} onChange={setCode} error={error ?? undefined} />

            <Button type="submit" fullWidth isLoading={isVerifying} loadingText="Verifying...">
              Verify Code
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate">
            Didn't get a code?{' '}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              className="font-medium text-primary hover:text-primary-hover disabled:cursor-not-allowed disabled:text-mist disabled:hover:text-mist"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
            </button>
          </p>
        </AuthCard>
      </div>
    </div>
  );
}