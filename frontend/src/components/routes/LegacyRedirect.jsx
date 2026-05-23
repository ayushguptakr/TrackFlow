import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES, ticketDetailPath } from '../../utils/constants';

const resolveLegacyPath = (pathname) => {
  if (pathname === '/admin/dashboard' || pathname === '/support/dashboard') {
    return ROUTES.DASHBOARD;
  }

  if (pathname.endsWith('/tickets/new')) {
    return ROUTES.CREATE_TICKET;
  }

  if (pathname.endsWith('/users')) {
    return ROUTES.USERS;
  }

  if (pathname.endsWith('/tickets/mine')) {
    return ROUTES.TICKETS_MINE;
  }

  const ticketDetailMatch = pathname.match(/\/tickets\/([^/]+)$/);
  if (ticketDetailMatch && ticketDetailMatch[1] !== 'mine' && ticketDetailMatch[1] !== 'new') {
    return ticketDetailPath(ticketDetailMatch[1]);
  }

  if (pathname.endsWith('/tickets')) {
    return ROUTES.TICKETS;
  }

  return ROUTES.DASHBOARD;
};

const LegacyRedirect = () => {
  const { pathname } = useLocation();
  return <Navigate to={resolveLegacyPath(pathname)} replace />;
};

export default LegacyRedirect;
