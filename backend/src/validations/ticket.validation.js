const { body, param, query } = require('express-validator');
const {
  STATUS_VALUES,
  PRIORITY_VALUES,
  CATEGORY_VALUES,
} = require('../constants/ticket');

const mongoIdParam = (name) =>
  param(name).isMongoId().withMessage(`Invalid ${name}`);

const createTicketRules = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),
  body('category')
    .optional()
    .isIn(CATEGORY_VALUES)
    .withMessage(`Category must be one of: ${CATEGORY_VALUES.join(', ')}`),
  body('priority')
    .optional()
    .isIn(PRIORITY_VALUES)
    .withMessage(`Priority must be one of: ${PRIORITY_VALUES.join(', ')}`),
  body('status')
    .optional()
    .isIn(STATUS_VALUES)
    .withMessage(`Status must be one of: ${STATUS_VALUES.join(', ')}`),
  body('assignedTo')
    .optional({ values: 'null' })
    .custom((value) => value === null || value === '' || /^[a-f\d]{24}$/i.test(value))
    .withMessage('assignedTo must be a valid user id or null'),
];

const updateTicketRules = [
  mongoIdParam('id'),
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Description cannot be empty')
    .isLength({ max: 5000 })
    .withMessage('Description cannot exceed 5000 characters'),
  body('category')
    .optional()
    .isIn(CATEGORY_VALUES)
    .withMessage(`Category must be one of: ${CATEGORY_VALUES.join(', ')}`),
  body('priority')
    .optional()
    .isIn(PRIORITY_VALUES)
    .withMessage(`Priority must be one of: ${PRIORITY_VALUES.join(', ')}`),
  body('status')
    .optional()
    .isIn(STATUS_VALUES)
    .withMessage(`Status must be one of: ${STATUS_VALUES.join(', ')}`),
  body('assignedTo')
    .optional({ values: 'null' })
    .custom((value) => value === null || value === '' || /^[a-f\d]{24}$/i.test(value))
    .withMessage('assignedTo must be a valid user id or null'),
];

const ticketIdRules = [mongoIdParam('id')];

const listTicketsRules = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('status').optional().isIn(STATUS_VALUES).withMessage('Invalid status filter'),
  query('priority').optional().isIn(PRIORITY_VALUES).withMessage('Invalid priority filter'),
  query('category').optional().isIn(CATEGORY_VALUES).withMessage('Invalid category filter'),
  query('assignedTo').optional().isMongoId().withMessage('Invalid assignedTo filter'),
  query('createdBy').optional().isMongoId().withMessage('Invalid createdBy filter'),
  query('unassigned').optional().isIn(['true', 'false']).withMessage('unassigned must be true or false'),
  query('mine').optional().isIn(['true', 'false']).withMessage('mine must be true or false'),
  query('search').optional().isString().trim(),
  query('sortBy')
    .optional()
    .isIn(['createdAt', 'updatedAt', 'priority', 'status', 'title'])
    .withMessage('Invalid sortBy field'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc'),
];

module.exports = {
  createTicketRules,
  updateTicketRules,
  ticketIdRules,
  listTicketsRules,
};
