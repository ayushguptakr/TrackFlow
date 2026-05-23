const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { registerRules, loginRules } = require('../validations/auth.validation');

const router = express.Router();

router.post('/register', validate(registerRules), register);
router.post('/login', validate(loginRules), login);
router.get('/me', protect, getMe);

module.exports = router;
