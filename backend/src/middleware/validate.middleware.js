const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((rule) => rule.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const messages = errors.array().map((err) => err.msg);
    return next(new ApiError(400, messages.join(', ')));
  }

  next();
};

module.exports = validate;
