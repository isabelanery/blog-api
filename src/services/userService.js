const db = require('../database/models');

const userService = {
  list: async () => {
    const users = await db.User.findAll();
    return users;
  },
  create: async ({ displayName, email, password, image }) => {
    const newUser = await db.User.create({ displayName, email, password, image });
    return newUser;
  },
};

module.exports = userService;