const authService = require('../services/authService');
const jwtService = require('../services/jwtService');
const usersService = require('../services/userService');

const userController = {
  list: async (req, res) => {
    const users = await usersService.list();

    res.status(200).json(users);
  },
  create: async (req, res) => {
    const { displayName, email, password, image } = await authService.validateNewUser(req.body);

    await usersService.create({ displayName, email, password, image });
    
    const { password: senha, ...userWithoutPassword } = req.body;
    const token = await jwtService.createToken(userWithoutPassword);

    res.status(201).json({ token });
  },
  findById: async (req, res) => {
    const { id } = req.params;

    const user = await usersService.findById(id);
    
    res.status(200).json(user);
  },
};

module.exports = userController;