const Ticket = require('../models/Ticket');
const User = require('../models/User');
const { ROLES } = require('../constants/roles');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');
const { getCommentCountsByTicketIds } = require('../utils/commentCounts');
const {
  getListFilterForRole,
  assertCanView,
  assertCanUpdate,
  assertCanDelete,
} = require('../utils/ticketAccess');
const {
  populateTicket,
  buildTicketFilters,
  buildSort,
  formatTicket,
} = require('../utils/ticketQuery');

const resolveAssignee = async (assignedTo, user) => {
  if (assignedTo === undefined) return undefined;

  if (assignedTo === null || assignedTo === '') {
    if (user.role === ROLES.USER) {
      throw new ApiError(403, 'You cannot unassign tickets');
    }
    return null;
  }

  if (user.role === ROLES.USER) {
    throw new ApiError(403, 'You cannot assign tickets to other users');
  }

  const assignee = await User.findById(assignedTo);
  if (!assignee) {
    throw new ApiError(404, 'Assignee not found');
  }

  if (![ROLES.SUPPORT, ROLES.ADMIN].includes(assignee.role)) {
    throw new ApiError(400, 'Tickets can only be assigned to support or admin users');
  }

  return assignee._id;
};

const applyAllowedUpdates = (ticket, body, user) => {
  const updates = { ...body };
  delete updates.assignedTo;

  if (user.role === ROLES.SUPPORT) {
    delete updates.title;
    delete updates.description;
    delete updates.category;
  }

  if (user.role === ROLES.USER) {
    delete updates.assignedTo;
  }

  const allowedFields = ['title', 'description', 'category', 'priority', 'status'];

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      ticket[field] = updates[field];
    }
  });
};

const createTicket = asyncHandler(async (req, res) => {
  const { title, description, category, priority, status } = req.body;

  let assignedTo = null;
  if (req.body.assignedTo) {
    assignedTo = await resolveAssignee(req.body.assignedTo, req.user);
  }

  const ticket = await Ticket.create({
    title,
    description,
    category,
    priority,
    status,
    createdBy: req.user._id,
    assignedTo,
  });

  const populated = await populateTicket(Ticket.findById(ticket._id));

  res.status(201).json({
    success: true,
    message: 'Ticket created successfully',
    data: { ticket: formatTicket(populated, 0) },
  });
});

const getTickets = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query);
  const roleFilter = getListFilterForRole(req.user, req.query);
  const queryFilters = buildTicketFilters(req.query, req.user);
  const filter = { ...roleFilter, ...queryFilters };
  const sort = buildSort(req.query);

  const [tickets, total] = await Promise.all([
    populateTicket(Ticket.find(filter).sort(sort).skip(skip).limit(limit)),
    Ticket.countDocuments(filter),
  ]);

  const commentCounts = await getCommentCountsByTicketIds(tickets.map((t) => t._id));

  res.status(200).json({
    success: true,
    data: {
      tickets: tickets.map((ticket) =>
        formatTicket(ticket, commentCounts[ticket._id.toString()] || 0)
      ),
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

const getTicket = asyncHandler(async (req, res) => {
  const ticket = await populateTicket(Ticket.findById(req.params.id));

  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }

  assertCanView(ticket, req.user);

  const commentCounts = await getCommentCountsByTicketIds([ticket._id]);
  const commentCount = commentCounts[ticket._id.toString()] || 0;

  res.status(200).json({
    success: true,
    data: { ticket: formatTicket(ticket, commentCount) },
  });
});

const updateTicket = asyncHandler(async (req, res) => {
  const ticket = await populateTicket(Ticket.findById(req.params.id));

  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }

  assertCanUpdate(ticket, req.user);

  const assigneeId = await resolveAssignee(req.body.assignedTo, req.user);
  applyAllowedUpdates(ticket, { ...req.body }, req.user);

  if (assigneeId !== undefined) {
    ticket.assignedTo = assigneeId;
  }

  await ticket.save();

  const updated = await populateTicket(Ticket.findById(ticket._id));
  const commentCounts = await getCommentCountsByTicketIds([ticket._id]);

  res.status(200).json({
    success: true,
    message: 'Ticket updated successfully',
    data: {
      ticket: formatTicket(updated, commentCounts[ticket._id.toString()] || 0),
    },
  });
});

const deleteTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new ApiError(404, 'Ticket not found');
  }

  assertCanDelete(ticket, req.user);

  await ticket.deleteOne();

  res.status(200).json({
    success: true,
    message: 'Ticket deleted successfully',
  });
});

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
};
