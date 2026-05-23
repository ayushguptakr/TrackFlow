import { ROUTES } from './constants';

const PAGE_META = {
  [ROUTES.DASHBOARD]: {
    title: 'Dashboard',
    subtitle: 'Your workspace overview',
  },
  [ROUTES.TICKETS]: {
    title: 'All Tickets',
    subtitle: 'Browse and manage tickets',
  },
  [ROUTES.TICKETS_MINE]: {
    title: 'My Tickets',
    subtitle: 'Tickets assigned to you',
  },
  [ROUTES.CREATE_TICKET]: {
    title: 'Create Ticket',
    subtitle: 'Submit a new issue',
  },
  [ROUTES.USERS]: {
    title: 'User Management',
    subtitle: 'Manage users and roles',
  },
};

export const getRoutePageMeta = (pathname, defaults = {}) => {
  if (PAGE_META[pathname]) {
    return PAGE_META[pathname];
  }

  if (/^\/tickets\/[^/]+$/.test(pathname) && pathname !== ROUTES.TICKETS_MINE) {
    return { title: 'Ticket Details', subtitle: '' };
  }

  return {
    title: defaults.title ?? 'Dashboard',
    subtitle: defaults.subtitle ?? '',
  };
};
