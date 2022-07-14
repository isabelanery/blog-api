const usersService = require('../services/userService');

const userController = {
  list: async (req, res) => {
    const users = await usersService.list();

    res.status(200).json(users);
  },
};

module.exports = userController;