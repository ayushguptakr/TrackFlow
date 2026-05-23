const { body, param, query } = require('express-validator');
const { ROLE_VALUES } = require('../constants/roles');

const listUsersRules = [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('role').optional().isIn(ROLE_VALUES),
  query('search').optional().isString().trim(),
];

const updateRoleRules = [
  param('id').isMongoId().withMessage('Invalid user id'),
  body('role').isIn(ROLE_VALUES).withMessage('Invalid role'),
];

module.exports = {
  listUsersRules,
  updateRoleRules,
};
