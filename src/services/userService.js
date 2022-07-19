const db = require('../database/models');

const userService = {
  list: async () => {
    const users = await db.User.findAll({
      attributes: { exclude: ['password'] },
    });
    return users;
  },
  create: async ({ displayName, email, password, image }) => {
    const newUser = await db.User.create({ displayName, email, password, image });
    return newUser;
  },
  findById: async (id) => {
    const user = await db.User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }

    return user;
  },
  remove: async (id) => {
    await db.User.destroy({ where: { id } });
  },
};

module.exports = userService;