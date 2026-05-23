import { formatLabel } from './ticketConstants';

export const buildActivityTimeline = (ticket, comments = []) => {
  if (!ticket) return [];

  const events = [
    {
      id: `created-${ticket.id}`,
      type: 'created',
      date: ticket.createdAt,
      user: ticket.createdBy,
      title: 'Ticket created',
      description: `${ticket.createdBy?.name || 'User'} opened this ticket`,
    },
  ];

  comments.forEach((comment) => {
    events.push({
      id: `comment-${comment.id}`,
      type: 'comment',
      date: comment.createdAt,
      user: comment.author,
      title: 'Comment added',
      description: comment.text,
    });
  });

  const created = new Date(ticket.createdAt).getTime();
  const updated = new Date(ticket.updatedAt).getTime();

  if (updated - created > 2000) {
    events.push({
      id: `updated-${ticket.id}-${updated}`,
      type: 'updated',
      date: ticket.updatedAt,
      user: null,
      title: 'Ticket updated',
      description: `Status: ${formatLabel(ticket.status)} · Priority: ${formatLabel(ticket.priority)}`,
    });
  }

  return events.sort((a, b) => new Date(a.date) - new Date(b.date));
};
