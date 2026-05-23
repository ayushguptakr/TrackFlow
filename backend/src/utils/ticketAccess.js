const mongoose = require('mongoose');
const { ROLES } = require('../constants/roles');
const ApiError = require('./ApiError');

const getListFilterForRole = (user, query = {}) => {
  if (user.role === ROLES.ADMIN) {
    return {};
  }

  if (user.role === ROLES.SUPPORT) {
    if (query.mine === 'true') {
      return { assignedTo: user._id };
    }
    return {};
  }

  return { createdBy: user._id };
};

const canViewTicket = (ticket, user) => {
  if (user.role === ROLES.ADMIN) return true;
  if (user.role === ROLES.SUPPORT) return true;
  return ticket.createdBy._id
    ? ticket.createdBy._id.toString() === user._id.toString()
    : ticket.createdBy.toString() === user._id.toString();
};

const canUpdateTicket = (ticket, user) => {
  if (user.role === ROLES.ADMIN) return true;

  if (user.role === ROLES.USER) {
    const creatorId = ticket.createdBy._id || ticket.createdBy;
    return creatorId.toString() === user._id.toString();
  }

  if (user.role === ROLES.SUPPORT) {
    if (!ticket.assignedTo) return false;
    const assigneeId = ticket.assignedTo._id || ticket.assignedTo;
    return assigneeId.toString() === user._id.toString();
  }

  return false;
};

const canDeleteTicket = (ticket, user) => {
  if (user.role === ROLES.ADMIN) return true;

  if (user.role === ROLES.USER) {
    const creatorId = ticket.createdBy._id || ticket.createdBy;
    return creatorId.toString() === user._id.toString();
  }

  return false;
};

const assertCanView = (ticket, user) => {
  if (!canViewTicket(ticket, user)) {
    throw new ApiError(403, 'You do not have permission to view this ticket');
  }
};

const assertCanUpdate = (ticket, user) => {
  if (!canUpdateTicket(ticket, user)) {
    throw new ApiError(403, 'You do not have permission to update this ticket');
  }
};

const assertCanDelete = (ticket, user) => {
  if (!canDeleteTicket(ticket, user)) {
    throw new ApiError(403, 'You do not have permission to delete this ticket');
  }
};

const validateObjectId = (id, label = 'ID') => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, `Invalid ${label}`);
  }
};

module.exports = {
  getListFilterForRole,
  canViewTicket,
  canUpdateTicket,
  canDeleteTicket,
  assertCanView,
  assertCanUpdate,
  assertCanDelete,
  validateObjectId,
};
