import { Link } from 'react-router-dom';

export default function AuthLogo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-base">
        M
      </span>
      <span className="font-display text-lg font-semibold tracking-tight text-ink">MoneyLens</span>
    </Link>
  );
}