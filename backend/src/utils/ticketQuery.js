const mongoose = require('mongoose');
const {
  STATUS_VALUES,
  PRIORITY_VALUES,
  CATEGORY_VALUES,
} = require('../constants/ticket');
const { ROLES } = require('../constants/roles');
const ApiError = require('./ApiError');

const USER_POPULATE_FIELDS = 'name email role';

const populateTicket = (query) =>
  query.populate('createdBy', USER_POPULATE_FIELDS).populate('assignedTo', USER_POPULATE_FIELDS);

const buildTicketFilters = (query, user) => {
  const filters = {};

  if (query.status && STATUS_VALUES.includes(query.status)) {
    filters.status = query.status;
  }

  if (query.priority && PRIORITY_VALUES.includes(query.priority)) {
    filters.priority = query.priority;
  }

  if (query.category && CATEGORY_VALUES.includes(query.category)) {
    filters.category = query.category;
  }

  if (query.assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(query.assignedTo)) {
      throw new ApiError(400, 'Invalid assignedTo filter');
    }
    if (user.role === ROLES.USER) {
      throw new ApiError(403, 'You cannot filter by assignee');
    }
    filters.assignedTo = query.assignedTo;
  }

  if (query.unassigned === 'true') {
    if (user.role === ROLES.USER) {
      throw new ApiError(403, 'You cannot filter by assignee');
    }
    filters.assignedTo = null;
  }

  if (query.createdBy) {
    if (!mongoose.Types.ObjectId.isValid(query.createdBy)) {
      throw new ApiError(400, 'Invalid createdBy filter');
    }
    if (user.role === ROLES.USER) {
      throw new ApiError(403, 'You cannot filter by creator');
    }
    filters.createdBy = query.createdBy;
  }

  if (query.search?.trim()) {
    const searchRegex = { $regex: query.search.trim(), $options: 'i' };
    filters.$or = [{ title: searchRegex }, { description: searchRegex }];
  }

  return filters;
};

const buildSort = (query) => {
  const allowedSortFields = ['createdAt', 'updatedAt', 'priority', 'status', 'title'];
  const sortBy = allowedSortFields.includes(query.sortBy) ? query.sortBy : 'createdAt';
  const order = query.order === 'asc' ? 1 : -1;

  return { [sortBy]: order };
};

const formatUser = (user) => {
  if (!user) return null;
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

const formatTicket = (ticket, commentCount = 0) => ({
  id: ticket._id,
  title: ticket.title,
  description: ticket.description,
  category: ticket.category,
  priority: ticket.priority,
  status: ticket.status,
  createdBy: formatUser(ticket.createdBy),
  assignedTo: formatUser(ticket.assignedTo),
  commentCount,
  createdAt: ticket.createdAt,
  updatedAt: ticket.updatedAt,
});

module.exports = {
  populateTicket,
  buildTicketFilters,
  buildSort,
  formatTicket,
  formatUser,
};
