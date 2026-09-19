import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../common/Input';
import PasswordInput from './PasswordInput';
import Checkbox from '../common/CheckBox';
import Button from '../common/Button';
import AuthError from './AuthError';
import { IconMail } from '../Icons';
import { useAuth } from '../../hooks/useAuth';

interface FormErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!email) next.email = 'Email address is required.';
    else if (!EMAIL_PATTERN.test(email)) next.email = 'Please enter a valid email address.';
    if (!password) next.password = 'Password is required.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    // Frontend-only for now — AuthProvider.login simulates a session; swap it
    // for a real authService.login call once the backend is ready.
    setTimeout(async () => {
      try {
        await login(email, password);
        navigate('/dashboard');
      } catch {
        setFormError('Please check your email and password and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1200);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {formError && <AuthError message={formError} />}

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
          autoComplete="current-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <div className="mt-3 flex items-center justify-between">
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <Link to="/forgot-password" className="text-sm font-medium text-primary hover:text-primary-hover">
            Forgot Password?
          </Link>
        </div>
      </div>

      <Button type="submit" fullWidth isLoading={isSubmitting} loadingText="Logging in...">
        Log In
      </Button>
    </form>
  );
}