import { Navigate, Outlet } from 'react-router-dom';
import PageLoader from '../ui/PageLoader';
import useAuth from '../../hooks/useAuth';
import { getDashboardPath } from '../../utils/roleRedirect';

const GuestRoute = () => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) return <PageLoader message="Loading..." />;

  if (isAuthenticated) {
    return <Navigate to={getDashboardPath()} replace />;
  }

  return <Outlet />;
};

export default GuestRoute;
