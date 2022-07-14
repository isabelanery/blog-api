const usersService = require('../services/userService');

const userController = {
  list: async (req, res) => {
    const users = await usersService.list();

    res.status(200).json(users);
  },
  create: async (req, res) => {
    const { displayName, email, password, image } = req.body;

    const newUser = await usersService.create({ displayName, email, password, image });

    res.status(201).json(newUser);
  },
};

module.exports = userController;