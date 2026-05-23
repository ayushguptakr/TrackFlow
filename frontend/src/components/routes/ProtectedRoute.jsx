import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageLoader from '../ui/PageLoader';
import useAuth from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <PageLoader message="Loading your workspace..." />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
