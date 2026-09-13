import { useState, type FormEvent } from 'react';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import PasswordRequirements, { passwordMeetsAllRequirements } from './PasswordRequirements';
import Button from '../common/Button';

interface FormErrors {
  password?: string;
  confirmPassword?: string;
}

interface ResetPasswordFormProps {
  onSuccess: () => void;
}

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showMatchSuccess = confirmPassword.length > 0 && confirmPassword === password;

  function validate(): boolean {
    const next: FormErrors = {};
    if (!password) next.password = 'Password is required.';
    else if (!passwordMeetsAllRequirements(password)) next.password = 'Password does not meet all requirements yet.';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your new password.';
    else if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend-only for now — wire this to authService.resetPassword once the backend is ready.
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <PasswordInput
          id="new-password"
          label="New Password"
          autoComplete="new-password"
          placeholder="Enter your new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordStrength password={password} />
        <PasswordRequirements password={password} />
      </div>

      <div>
        <PasswordInput
          id="confirm-new-password"
          label="Confirm New Password"
          autoComplete="new-password"
          placeholder="Confirm your new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />
        {showMatchSuccess && !errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-primary">Passwords match.</p>
        )}
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting} loadingText="Resetting password...">
        Reset Password
      </Button>
    </form>
  );
}