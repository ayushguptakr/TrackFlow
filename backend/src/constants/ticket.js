const TICKET_STATUS = Object.freeze({
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
});

const TICKET_PRIORITY = Object.freeze({
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
});

const TICKET_CATEGORY = Object.freeze({
  BUG: 'bug',
  FEATURE: 'feature',
  SUPPORT: 'support',
  GENERAL: 'general',
});

const STATUS_VALUES = Object.values(TICKET_STATUS);
const PRIORITY_VALUES = Object.values(TICKET_PRIORITY);
const CATEGORY_VALUES = Object.values(TICKET_CATEGORY);

module.exports = {
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
  STATUS_VALUES,
  PRIORITY_VALUES,
  CATEGORY_VALUES,
};
