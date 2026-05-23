import { ROLES, ROUTES } from './constants';

export const getNavigationItems = (role) => {
  const navByRole = {
    [ROLES.USER]: [
      { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'dashboard', end: true },
      { label: 'My Tickets', path: ROUTES.TICKETS_MINE, icon: 'issues', end: true },
      { label: 'Create Ticket', path: ROUTES.CREATE_TICKET, icon: 'queue', end: true },
    ],
    [ROLES.SUPPORT]: [
      { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'dashboard', end: true },
      { label: 'All Tickets', path: ROUTES.TICKETS, icon: 'queue', end: true },
      { label: 'My Tickets', path: ROUTES.TICKETS_MINE, icon: 'issues', end: true },
      { label: 'Create Ticket', path: ROUTES.CREATE_TICKET, icon: 'chart', end: true },
    ],
    [ROLES.ADMIN]: [
      { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: 'dashboard', end: true },
      { label: 'All Tickets', path: ROUTES.TICKETS, icon: 'issues', end: true },
      { label: 'Users', path: ROUTES.USERS, icon: 'users', end: true },
      { label: 'Create Ticket', path: ROUTES.CREATE_TICKET, icon: 'queue', end: true },
    ],
  };

  return navByRole[role] || navByRole[ROLES.USER];
};
