import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthHeader from '../../components/auth/AuthHeader';
import RegisterForm from '../../components/auth/RegisterForm';

export default function Register() {
  return (
    <AuthLayout
      brandHeadline="Start understanding your money."
      brandSubtext="Take control of your spending and discover where your money really goes."
    >
      <AuthHeader eyebrow="Get started for free" title="Create your MoneyLens account" subtext="Start understanding where your money goes." />
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-slate">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}