const express = require('express');
const {
  getUsers,
  updateUserRole,
  getSupportAgents,
  getAnalytics,
} = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');
const { ROLES } = require('../constants/roles');
const { listUsersRules, updateRoleRules } = require('../validations/admin.validation');

const router = express.Router();

router.use(protect, authorize(ROLES.ADMIN));

router.get('/analytics', getAnalytics);
router.get('/agents', getSupportAgents);
router.get('/users', validate(listUsersRules), getUsers);
router.put('/users/:id/role', validate(updateRoleRules), updateUserRole);

module.exports = router;
