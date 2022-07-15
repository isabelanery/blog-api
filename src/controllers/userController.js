const authService = require('../services/authService');
const jwtService = require('../services/jwtService');
const usersService = require('../services/userService');

const userController = {
  list: async (req, res) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'UnauthorizedError';
      throw e;
    }
    
    await jwtService.validateToken(authorization); 

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
};

module.exports = userController;