const express = require('express');
const healthRoutes = require('./health.routes');
const authRoutes = require('./auth.routes');
const ticketRoutes = require('./ticket.routes');
const adminRoutes = require('./admin.routes');

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/auth', authRoutes);
router.use('/tickets', ticketRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
