import { ROUTES, ticketDetailPath } from './constants';

export const getTicketRoutes = () => ({
  tickets: ROUTES.TICKETS,
  myTickets: ROUTES.TICKETS_MINE,
  newTicket: ROUTES.CREATE_TICKET,
  ticketDetail: ticketDetailPath,
});
