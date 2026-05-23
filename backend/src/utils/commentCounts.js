const Comment = require('../models/Comment');

const getCommentCountsByTicketIds = async (ticketIds) => {
  if (!ticketIds.length) return {};

  const counts = await Comment.aggregate([
    { $match: { ticket: { $in: ticketIds } } },
    { $group: { _id: '$ticket', count: { $sum: 1 } } },
  ]);

  return counts.reduce((acc, { _id, count }) => {
    acc[_id.toString()] = count;
    return acc;
  }, {});
};

module.exports = { getCommentCountsByTicketIds };
