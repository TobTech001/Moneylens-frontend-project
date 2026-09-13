import { useState, type FormEvent } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { IconMail } from '../Icons';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ForgotPasswordFormProps {
  onSuccess: (email: string) => void;
}

export default function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email) {
      setError('Email address is required.');
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(undefined);

    setIsSubmitting(true);
    // Frontend-only for now — wire this to authService.forgotPassword once the backend is ready.
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess(email);
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        id="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        icon={<IconMail className="h-[18px] w-[18px]" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />

      <Button type="submit" fullWidth isLoading={isSubmitting} loadingText="Sending instructions...">
        Send Reset Instructions
      </Button>
    </form>
  );
}