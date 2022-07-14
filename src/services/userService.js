const db = require('../database/models');

const userService = {
  list: async () => {
    const users = await db.User.findAll();
    return users;
  },
};

module.exports = userService;