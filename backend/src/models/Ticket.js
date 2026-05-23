const mongoose = require('mongoose');
const Comment = require('./Comment');
const {
  STATUS_VALUES,
  PRIORITY_VALUES,
  CATEGORY_VALUES,
  TICKET_STATUS,
  TICKET_PRIORITY,
  TICKET_CATEGORY,
} = require('../constants/ticket');

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    category: {
      type: String,
      enum: {
        values: CATEGORY_VALUES,
        message: '{VALUE} is not a valid category',
      },
      default: TICKET_CATEGORY.GENERAL,
    },
    priority: {
      type: String,
      enum: {
        values: PRIORITY_VALUES,
        message: '{VALUE} is not a valid priority',
      },
      default: TICKET_PRIORITY.MEDIUM,
    },
    status: {
      type: String,
      enum: {
        values: STATUS_VALUES,
        message: '{VALUE} is not a valid status',
      },
      default: TICKET_STATUS.OPEN,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
    },
  },
  { timestamps: true }
);

ticketSchema.index({ title: 'text', description: 'text' });
ticketSchema.index({ status: 1, priority: 1, category: 1, createdAt: -1 });

ticketSchema.pre(
  'deleteOne',
  { document: true, query: false },
  async function cascadeDeleteComments() {
    await Comment.deleteMany({ ticket: this._id });
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
