const USER_POPULATE_FIELDS = 'name email role';

const populateComment = (query) =>
  query.populate('author', USER_POPULATE_FIELDS).populate('ticket', 'title status');

const formatUser = (user) => {
  if (!user) return null;
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const formatTicketRef = (ticket) => {
  if (!ticket) return null;
  return {
    id: ticket._id,
    title: ticket.title,
    status: ticket.status,
  };
};

const formatComment = (comment) => ({
  id: comment._id,
  text: comment.text,
  ticket: formatTicketRef(comment.ticket),
  author: formatUser(comment.author),
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
});

module.exports = {
  populateComment,
  formatComment,
  formatUser,
  formatTicketRef,
  USER_POPULATE_FIELDS,
};
