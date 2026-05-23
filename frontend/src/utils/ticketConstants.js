export const TICKET_STATUS = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  RESOLVED: 'resolved',
  CLOSED: 'closed',
};

export const TICKET_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const TICKET_CATEGORY = {
  BUG: 'bug',
  FEATURE: 'feature',
  SUPPORT: 'support',
  GENERAL: 'general',
};

export const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: TICKET_STATUS.OPEN, label: 'Open' },
  { value: TICKET_STATUS.IN_PROGRESS, label: 'In progress' },
  { value: TICKET_STATUS.RESOLVED, label: 'Resolved' },
  { value: TICKET_STATUS.CLOSED, label: 'Closed' },
];

export const PRIORITY_OPTIONS = [
  { value: '', label: 'All priorities' },
  { value: TICKET_PRIORITY.LOW, label: 'Low' },
  { value: TICKET_PRIORITY.MEDIUM, label: 'Medium' },
  { value: TICKET_PRIORITY.HIGH, label: 'High' },
  { value: TICKET_PRIORITY.URGENT, label: 'Urgent' },
];

export const CATEGORY_OPTIONS = [
  { value: '', label: 'All categories' },
  { value: TICKET_CATEGORY.BUG, label: 'Bug' },
  { value: TICKET_CATEGORY.FEATURE, label: 'Feature' },
  { value: TICKET_CATEGORY.SUPPORT, label: 'Support' },
  { value: TICKET_CATEGORY.GENERAL, label: 'General' },
];

export const SORT_OPTIONS = [
  { value: 'createdAt', label: 'Created date' },
  { value: 'updatedAt', label: 'Updated date' },
  { value: 'priority', label: 'Priority' },
  { value: 'status', label: 'Status' },
  { value: 'title', label: 'Title' },
];

export const formatLabel = (value) =>
  value
    ? value
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    : '';
