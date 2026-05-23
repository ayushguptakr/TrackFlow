const { body, param, query } = require('express-validator');

const ticketIdParam = param('ticketId').isMongoId().withMessage('Invalid ticket id');

const addCommentRules = [
  ticketIdParam,
  body('text')
    .trim()
    .notEmpty()
    .withMessage('Comment text is required')
    .isLength({ max: 2000 })
    .withMessage('Comment cannot exceed 2000 characters'),
];

const getCommentsRules = [
  ticketIdParam,
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('order').optional().isIn(['asc', 'desc']).withMessage('order must be asc or desc'),
];

module.exports = {
  addCommentRules,
  getCommentsRules,
};
