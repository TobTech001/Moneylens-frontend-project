import { Outlet } from 'react-router-dom';

// Individual auth pages (Login, Register, etc.) each render their own full-page
// shell via components/auth/AuthLayout, so this route-level layout is a pass-through.
export default function AuthLayout() {
  return <Outlet />;
}