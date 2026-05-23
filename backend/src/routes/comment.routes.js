const express = require('express');
const { addComment, getComments } = require('../controllers/comment.controller');
const validate = require('../middleware/validate.middleware');
const { addCommentRules, getCommentsRules } = require('../validations/comment.validation');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(validate(getCommentsRules), getComments)
  .post(validate(addCommentRules), addComment);

module.exports = router;
