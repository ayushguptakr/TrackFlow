import { ROLES } from './constants';

export const canUpdateTicket = (ticket, user) => {
  if (!ticket || !user) return false;
  if (user.role === ROLES.ADMIN) return true;

  const creatorId = ticket.createdBy?.id || ticket.createdBy?._id;
  if (user.role === ROLES.USER) {
    return creatorId?.toString() === user.id?.toString();
  }

  if (user.role === ROLES.SUPPORT) {
    const assigneeId = ticket.assignedTo?.id || ticket.assignedTo?._id;
    return assigneeId?.toString() === user.id?.toString();
  }

  return false;
};

export const canUpdateStatusPriority = (ticket, user) => canUpdateTicket(ticket, user);
