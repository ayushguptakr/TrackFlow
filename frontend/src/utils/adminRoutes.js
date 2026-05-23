import { ROUTES, ticketDetailPath } from './constants';

export const ADMIN_ROUTES = {
  dashboard: ROUTES.DASHBOARD,
  users: ROUTES.USERS,
  tickets: ROUTES.TICKETS,
  myTickets: ROUTES.TICKETS_MINE,
  newTicket: ROUTES.CREATE_TICKET,
  ticketDetail: ticketDetailPath,
};
