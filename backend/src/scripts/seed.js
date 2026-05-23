require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const { ROLES } = require('../constants/roles');
const { TICKET_STATUS, TICKET_PRIORITY, TICKET_CATEGORY } = require('../constants/ticket');

const DEFAULT_PASSWORD = 'password123';

const usersData = [
  {
    name: 'Alex Admin',
    email: 'admin@trackflow.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.ADMIN,
  },
  {
    name: 'Sarah Support',
    email: 'sarah.support@trackflow.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.SUPPORT,
  },
  {
    name: 'Mike Support',
    email: 'mike.support@trackflow.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.SUPPORT,
  },
  {
    name: 'Emma Johnson',
    email: 'emma@example.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.USER,
  },
  {
    name: 'James Wilson',
    email: 'james@example.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.USER,
  },
  {
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.USER,
  },
  {
    name: 'David Chen',
    email: 'david@example.com',
    password: DEFAULT_PASSWORD,
    role: ROLES.USER,
  },
];

const buildTicketsData = (users) => {
  const [admin, sarah, mike, emma, james, priya, david] = users;

  return [
    {
      title: 'Login button unresponsive on mobile Safari',
      description:
        'Users on iOS Safari cannot submit the login form. The button appears disabled after entering credentials. Reproduced on iPhone 14, iOS 17.',
      category: TICKET_CATEGORY.BUG,
      priority: TICKET_PRIORITY.HIGH,
      status: TICKET_STATUS.IN_PROGRESS,
      createdBy: emma._id,
      assignedTo: sarah._id,
    },
    {
      title: 'Add dark mode support',
      description:
        'Request to add a system-wide dark mode toggle in user settings, matching the design system palette.',
      category: TICKET_CATEGORY.FEATURE,
      priority: TICKET_PRIORITY.MEDIUM,
      status: TICKET_STATUS.OPEN,
      createdBy: james._id,
      assignedTo: null,
    },
    {
      title: 'Cannot export tickets to CSV',
      description:
        'The export button on the tickets page returns a 500 error. Expected a downloadable CSV file.',
      category: TICKET_CATEGORY.BUG,
      priority: TICKET_PRIORITY.URGENT,
      status: TICKET_STATUS.OPEN,
      createdBy: priya._id,
      assignedTo: mike._id,
    },
    {
      title: 'Password reset email not received',
      description:
        'Customer waited 30 minutes and checked spam. Reset flow shows success but no email arrives.',
      category: TICKET_CATEGORY.SUPPORT,
      priority: TICKET_PRIORITY.HIGH,
      status: TICKET_STATUS.IN_PROGRESS,
      createdBy: david._id,
      assignedTo: sarah._id,
    },
    {
      title: 'Dashboard widgets misaligned on tablet',
      description: 'Analytics cards overlap at 768px viewport width. Layout should stack vertically.',
      category: TICKET_CATEGORY.BUG,
      priority: TICKET_PRIORITY.LOW,
      status: TICKET_STATUS.RESOLVED,
      createdBy: emma._id,
      assignedTo: mike._id,
    },
    {
      title: 'Request: Slack integration for notifications',
      description:
        'Team wants ticket updates pushed to a Slack channel. Include assignee changes and new comments.',
      category: TICKET_CATEGORY.FEATURE,
      priority: TICKET_PRIORITY.MEDIUM,
      status: TICKET_STATUS.OPEN,
      createdBy: james._id,
      assignedTo: null,
    },
    {
      title: 'API rate limit too aggressive',
      description:
        'Third-party integration hits 429 errors after 100 requests/minute. Need higher limits for enterprise tier.',
      category: TICKET_CATEGORY.SUPPORT,
      priority: TICKET_PRIORITY.MEDIUM,
      status: TICKET_STATUS.CLOSED,
      createdBy: priya._id,
      assignedTo: sarah._id,
    },
    {
      title: 'Typo on onboarding welcome screen',
      description: 'Step 2 says "Creat account" instead of "Create account".',
      category: TICKET_CATEGORY.GENERAL,
      priority: TICKET_PRIORITY.LOW,
      status: TICKET_STATUS.CLOSED,
      createdBy: david._id,
      assignedTo: mike._id,
    },
    {
      title: 'Ticket search returns incomplete results',
      description:
        'Searching by keyword misses tickets when the match is only in the description field.',
      category: TICKET_CATEGORY.BUG,
      priority: TICKET_PRIORITY.HIGH,
      status: TICKET_STATUS.OPEN,
      createdBy: emma._id,
      assignedTo: null,
    },
    {
      title: 'Role permissions audit for support agents',
      description:
        'Review and document what support users can and cannot do compared to admins.',
      category: TICKET_CATEGORY.GENERAL,
      priority: TICKET_PRIORITY.MEDIUM,
      status: TICKET_STATUS.IN_PROGRESS,
      createdBy: admin._id,
      assignedTo: sarah._id,
    },
    {
      title: 'Comment notifications not delivered',
      description: 'Users report missing email notifications when someone comments on their ticket.',
      category: TICKET_CATEGORY.BUG,
      priority: TICKET_PRIORITY.URGENT,
      status: TICKET_STATUS.OPEN,
      createdBy: james._id,
      assignedTo: mike._id,
    },
    {
      title: 'Improve ticket filter performance',
      description:
        'Filtering large ticket lists takes 3+ seconds. Consider indexing and query optimization.',
      category: TICKET_CATEGORY.FEATURE,
      priority: TICKET_PRIORITY.LOW,
      status: TICKET_STATUS.RESOLVED,
      createdBy: priya._id,
      assignedTo: sarah._id,
    },
  ];
};

const buildCommentsData = (tickets, users) => {
  const { sarah, mike, emma, james, priya, david, admin } = {
    sarah: users.find((u) => u.email === 'sarah.support@trackflow.com'),
    mike: users.find((u) => u.email === 'mike.support@trackflow.com'),
    emma: users.find((u) => u.email === 'emma@example.com'),
    james: users.find((u) => u.email === 'james@example.com'),
    priya: users.find((u) => u.email === 'priya@example.com'),
    david: users.find((u) => u.email === 'david@example.com'),
    admin: users.find((u) => u.email === 'admin@trackflow.com'),
  };

  const byTitle = (title) => tickets.find((t) => t.title === title);

  return [
    {
      ticket: byTitle('Login button unresponsive on mobile Safari')._id,
      author: emma._id,
      text: 'This started after the last deploy on Tuesday. Affects both login and register pages.',
    },
    {
      ticket: byTitle('Login button unresponsive on mobile Safari')._id,
      author: sarah._id,
      text: 'I can reproduce on iOS 17. Investigating touch event handlers on the submit button.',
    },
    {
      ticket: byTitle('Login button unresponsive on mobile Safari')._id,
      author: sarah._id,
      text: 'Found a z-index issue with the overlay. PR coming shortly.',
    },
    {
      ticket: byTitle('Cannot export tickets to CSV')._id,
      author: priya._id,
      text: 'Error appears in console: "Cannot read properties of undefined (reading map)".',
    },
    {
      ticket: byTitle('Cannot export tickets to CSV')._id,
      author: mike._id,
      text: 'Acknowledged. This is blocking our weekly reporting workflow.',
    },
    {
      ticket: byTitle('Password reset email not received')._id,
      author: david._id,
      text: 'Tried twice with different email providers (Gmail and Outlook).',
    },
    {
      ticket: byTitle('Password reset email not received')._id,
      author: sarah._id,
      text: 'Checked mail queue — emails were stuck. Cleared backlog, please try again.',
    },
    {
      ticket: byTitle('Dashboard widgets misaligned on tablet')._id,
      author: mike._id,
      text: 'Fixed in v1.2.1. CSS grid breakpoints updated for md screens.',
    },
    {
      ticket: byTitle('Add dark mode support')._id,
      author: james._id,
      text: 'Would love to see this match the Linear-style dark theme we discussed.',
    },
    {
      ticket: byTitle('API rate limit too aggressive')._id,
      author: sarah._id,
      text: 'Increased enterprise limit to 500 req/min. Closing as resolved.',
    },
    {
      ticket: byTitle('Role permissions audit for support agents')._id,
      author: admin._id,
      text: 'Draft doc shared internally. Support can update assigned tickets only.',
    },
    {
      ticket: byTitle('Comment notifications not delivered')._id,
      author: mike._id,
      text: 'SMTP credentials expired. Rotated keys and monitoring the queue.',
    },
    {
      ticket: byTitle('Improve ticket filter performance')._id,
      author: sarah._id,
      text: 'Added compound indexes. Filter queries now under 200ms in staging.',
    },
    {
      ticket: byTitle('Improve ticket filter performance')._id,
      author: priya._id,
      text: 'Confirmed much faster in production. Thanks!',
    },
  ];
};

const clearDatabase = async () => {
  await Comment.deleteMany({});
  await Ticket.deleteMany({});
  await User.deleteMany({});
};

const seed = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('MONGODB_URI is not defined in .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    console.log('Clearing existing data...');
    await clearDatabase();

    console.log('Creating users...');
    const users = await User.create(usersData);
    console.log(`  ✓ ${users.length} users created`);

    console.log('Creating tickets...');
    const tickets = await Ticket.create(buildTicketsData(users));
    console.log(`  ✓ ${tickets.length} tickets created`);

    console.log('Creating comments...');
    const comments = await Comment.create(buildCommentsData(tickets, users));
    console.log(`  ✓ ${comments.length} comments created`);

    console.log('\n--- Seed complete ---\n');
    console.log('Default password for all users:', DEFAULT_PASSWORD);
    console.log('\nAccounts:');
    users.forEach((user) => {
      console.log(`  [${user.role}] ${user.email} — ${user.name}`);
    });
    console.log('\nTicket breakdown:');
    const statusCounts = tickets.reduce((acc, t) => {
      acc[t.status] = (acc[t.status] || 0) + 1;
      return acc;
    }, {});
    const priorityCounts = tickets.reduce((acc, t) => {
      acc[t.priority] = (acc[t.priority] || 0) + 1;
      return acc;
    }, {});
    console.log('  Statuses:', statusCounts);
    console.log('  Priorities:', priorityCounts);
    console.log('');
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

seed();
