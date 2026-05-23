const ROLES = Object.freeze({
  ADMIN: 'admin',
  SUPPORT: 'support',
  USER: 'user',
});

const ROLE_VALUES = Object.values(ROLES);

module.exports = { ROLES, ROLE_VALUES };
