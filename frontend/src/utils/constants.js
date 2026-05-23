export const APP_NAME = 'TrackFlow';

export const STORAGE_KEYS = {
  TOKEN: 'trackflow_token',
  USER: 'trackflow_user',
};

export const ROLES = {
  ADMIN: 'admin',
  SUPPORT: 'support',
  USER: 'user',
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  TICKETS: '/tickets',
  TICKETS_MINE: '/tickets/mine',
  CREATE_TICKET: '/create-ticket',
  USERS: '/users',
  NOT_FOUND: '/404',
};

export const ticketDetailPath = (id) => `/tickets/${id}`;
