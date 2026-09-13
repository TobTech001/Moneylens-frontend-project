import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../common/Input';
import PasswordInput from './PasswordInput';
import PasswordStrength from './PasswordStrength';
import PasswordRequirements, { passwordMeetsAllRequirements } from './PasswordRequirements';
import Checkbox from '../common/CheckBox';
import Button from '../common/Button';
import AuthError from './AuthError';
import { IconMail, IconUser } from '../Icons';

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterForm() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!name.trim()) next.name = 'Full name is required.';
    if (!email) next.email = 'Email address is required.';
    else if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    else if (!passwordMeetsAllRequirements(password)) next.password = 'Password does not meet all requirements yet.';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your password.';
    else if (confirmPassword !== password) next.confirmPassword = 'Passwords do not match.';
    if (!agreedToTerms) next.terms = 'You must agree to the Terms of Service and Privacy Policy.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend-only for now — wire this to authService.register once the backend is ready.
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/dashboard');
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && <AuthError message={formError} />}

      <Input
        id="name"
        label="Full Name"
        type="text"
        autoComplete="name"
        placeholder="Enter your full name"
        icon={<IconUser className="h-[18px] w-[18px]" />}
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />

      <Input
        id="email"
        label="Email Address"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        icon={<IconMail className="h-[18px] w-[18px]" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />

      <div>
        <PasswordInput
          id="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordStrength password={password} />
        <PasswordRequirements password={password} />
      </div>

      <PasswordInput
        id="confirm-password"
        label="Confirm Password"
        autoComplete="new-password"
        placeholder="Re-enter your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />

      <Checkbox
        id="terms"
        label={
          <>
            I agree to the{' '}
            <Link to="/terms" className="font-medium text-primary hover:text-primary-hover">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="font-medium text-primary hover:text-primary-hover">
              Privacy Policy
            </Link>
            .
          </>
        }
        checked={agreedToTerms}
        onChange={(e) => setAgreedToTerms(e.target.checked)}
        error={errors.terms}
      />

      <Button type="submit" fullWidth isLoading={isSubmitting} loadingText="Creating your account...">
        Create Account
      </Button>
    </form>
  );
}