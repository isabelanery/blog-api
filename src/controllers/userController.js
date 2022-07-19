const authService = require('../services/authService');
const jwtService = require('../services/jwtService');
const userService = require('../services/userService');

const userController = {
  list: async (req, res) => {
    const users = await userService.list();

    res.status(200).json(users);
  },
  create: async (req, res) => {
    const { displayName, email, password, image } = await authService.validateNewUser(req.body);

    await userService.create({ displayName, email, password, image });
    
    const { password: senha, ...userWithoutPassword } = req.body;
    const token = await jwtService.createToken(userWithoutPassword);

    res.status(201).json({ token });
  },
  findById: async (req, res) => {
    const { id } = req.params;

    const user = await userService.findById(id);
    
    res.status(200).json(user);
  },
  remove: async (req, res) => {
    const { authorization } = req.headers;
    const { id } = await jwtService.validateToken(authorization);

    await userService.remove(id);

    res.status(204).end();
  },
};

module.exports = userController;