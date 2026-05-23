const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const { ROLES, ROLE_VALUES } = require('../constants/roles');
const { TICKET_STATUS } = require('../constants/ticket');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { parsePagination, buildPaginationMeta } = require('../utils/pagination');

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const getUsers = asyncHandler(async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query);
  const filter = {};

  if (req.query.role && ROLE_VALUES.includes(req.query.role)) {
    filter.role = req.query.role;
  }

  if (req.query.search?.trim()) {
    const search = req.query.search.trim();
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: {
      users: users.map(formatUser),
      pagination: buildPaginationMeta(total, page, limit),
    },
  });
});

const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!ROLE_VALUES.includes(role)) {
    throw new ApiError(400, 'Invalid role');
  }

  if (req.params.id === req.user._id.toString()) {
    throw new ApiError(400, 'You cannot change your own role');
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.role = role;
  await user.save();

  res.status(200).json({
    success: true,
    message: 'User role updated successfully',
    data: { user: formatUser(user) },
  });
});

const getSupportAgents = asyncHandler(async (req, res) => {
  const agents = await User.find({
    role: { $in: [ROLES.SUPPORT, ROLES.ADMIN] },
  })
    .sort({ name: 1 })
    .select('name email role');

  res.status(200).json({
    success: true,
    data: { agents: agents.map(formatUser) },
  });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalUsers,
    totalTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
    closedTickets,
    unassignedTickets,
    resolvedToday,
    supportAgents,
    statusBreakdown,
    priorityBreakdown,
    roleBreakdown,
    ticketsTrend,
  ] = await Promise.all([
    User.countDocuments(),
    Ticket.countDocuments(),
    Ticket.countDocuments({ status: TICKET_STATUS.OPEN }),
    Ticket.countDocuments({ status: TICKET_STATUS.IN_PROGRESS }),
    Ticket.countDocuments({ status: TICKET_STATUS.RESOLVED }),
    Ticket.countDocuments({ status: TICKET_STATUS.CLOSED }),
    Ticket.countDocuments({ assignedTo: null }),
    Ticket.countDocuments({
      status: { $in: [TICKET_STATUS.RESOLVED, TICKET_STATUS.CLOSED] },
      updatedAt: { $gte: todayStart },
    }),
    User.countDocuments({ role: ROLES.SUPPORT }),
    Ticket.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Ticket.aggregate([{ $group: { _id: '$priority', count: { $sum: 1 } } }]),
    User.aggregate([{ $group: { _id: '$role', count: { $sum: 1 } } }]),
    Ticket.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]),
  ]);

  const totalComments = await Comment.countDocuments();

  res.status(200).json({
    success: true,
    data: {
      summary: {
        totalUsers,
        totalTickets,
        openTickets,
        inProgressTickets,
        resolvedTickets,
        closedTickets,
        unassignedTickets,
        resolvedToday,
        supportAgents,
        totalComments,
      },
      ticketsByStatus: statusBreakdown.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      ticketsByPriority: priorityBreakdown.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      usersByRole: roleBreakdown.map((item) => ({
        name: item._id,
        value: item.count,
      })),
      ticketsTrend: ticketsTrend.map((item) => ({
        date: item._id,
        count: item.count,
      })),
    },
  });
});

module.exports = {
  getUsers,
  updateUserRole,
  getSupportAgents,
  getAnalytics,
};
