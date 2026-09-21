import { Link } from 'react-router-dom';
import Container from './Container';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg py-14">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-xs">
                💰
              </span>
              <span className="font-display text-base font-semibold text-ink">MoneyLens</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate">
              Helping you understand where your money goes.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Navigation</p>
            <ul className="mt-3 space-y-2 text-sm text-slate">
              <li><a href="#home" className="hover:text-ink">Home</a></li>
              <li><a href="#features" className="hover:text-ink">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-ink">How It Works</a></li>
              <li><a href="#insights" className="hover:text-ink">Insights</a></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Account</p>
            <ul className="mt-3 space-y-2 text-sm text-slate">
              <li><Link to="/login" className="hover:text-ink">Log In</Link></li>
              <li><Link to="/register" className="hover:text-ink">Create Account</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-ink">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate">
              <li><a href="/privacy" className="hover:text-ink">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-ink">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-mist">© 2026 MoneyLens. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}