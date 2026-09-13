import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthHeader from '../../components/auth/AuthHeader';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  return (
    <AuthLayout
      brandHeadline="See your money more clearly."
      brandSubtext="Understand your spending, track your financial habits, and make smarter decisions."
    >
      <AuthHeader eyebrow="Welcome back" title="Log in to MoneyLens" subtext="Continue understanding and managing your money." />
      <LoginForm />
      <p className="mt-6 text-center text-sm text-slate">
        Don't have an account?{' '}
        <Link to="/register" className="font-medium text-primary hover:text-primary-hover">
          Create an account
        </Link>
      </p>
    </AuthLayout>
  );
}