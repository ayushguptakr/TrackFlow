import useAuth from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import AdminDashboard from '../../pages/dashboards/AdminDashboard';
import SupportDashboard from '../../pages/dashboards/SupportDashboard';
import UserDashboard from '../../pages/dashboards/UserDashboard';

const RoleDashboard = () => {
  const { user } = useAuth();

  switch (user?.role) {
    case ROLES.ADMIN:
      return <AdminDashboard />;
    case ROLES.SUPPORT:
      return <SupportDashboard />;
    default:
      return <UserDashboard />;
  }
};

export default RoleDashboard;
