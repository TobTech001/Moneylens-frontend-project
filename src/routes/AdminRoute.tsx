import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

export default function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (!user) return <Navigate to={ROUTES.LOGIN} replace />;
  if (user.role !== 'admin') return <Navigate to={ROUTES.DASHBOARD} replace />;

  return <Outlet />;
}
