const express = require('express');
const {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticket.controller');
const commentRoutes = require('./comment.routes');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createTicketRules,
  updateTicketRules,
  ticketIdRules,
  listTicketsRules,
} = require('../validations/ticket.validation');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .get(validate(listTicketsRules), getTickets)
  .post(validate(createTicketRules), createTicket);

router.use('/:ticketId/comments', commentRoutes);

router
  .route('/:id')
  .get(validate(ticketIdRules), getTicket)
  .put(validate(updateTicketRules), updateTicket)
  .delete(validate(ticketIdRules), deleteTicket);

module.exports = router;
