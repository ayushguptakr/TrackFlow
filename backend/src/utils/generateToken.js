const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (userId) => {
  if (!config.jwtSecret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  return jwt.sign({ id: userId }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
};

module.exports = generateToken;
