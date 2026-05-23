const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const { ROLES } = require('../constants/roles');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const { assertCanView, assertCanUpdate } = require('../utils/ticketAccess');
const { populateTicket } = require('../utils/ticketQuery');
const { populateComment, formatComment } = require('../utils/commentQuery');

const loadTicketForComment = async (ticketId) => {
  const ticket = await populateTicket(Ticket.findById(ticketId));

  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }

  return ticket;
};

const assertCanAddComment = (ticket, user) => {
  assertCanView(ticket, user);

  if (user.role === ROLES.SUPPORT) {
    assertCanUpdate(ticket, user);
  }
};

const addComment = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const ticket = await loadTicketForComment(ticketId);

  assertCanAddComment(ticket, req.user);

  const comment = await Comment.create({
    text: req.body.text,
    ticket: ticket._id,
    author: req.user._id,
  });

  const populated = await populateComment(Comment.findById(comment._id));

  res.status(201).json({
    success: true,
    message: 'Comment added successfully',
    data: { comment: formatComment(populated) },
  });
});

const getComments = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const ticket = await loadTicketForComment(ticketId);

  assertCanView(ticket, req.user);

  const { page, limit, skip } = parsePagination(req.query);
  const sortOrder = req.query.order === 'desc' ? -1 : 1;

  const filter = { ticket: ticket._id };

  const [comments, total] = await Promise.all([
    populateComment(
      Comment.find(filter).sort({ createdAt: sortOrder }).skip(skip).limit(limit)
    ),
    Comment.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      ticket: { id: ticket._id, title: ticket.title },
      comments: comments.map(formatComment),
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

module.exports = {
  addComment,
  getComments,
};
