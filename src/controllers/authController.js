const authService = require('../services/authService');
const jwtService = require('../services/jwtService');

const authController = {
  login: async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    const token = await authService.validateLogin({ email, password });

    res.status(200).json({ token });
  },
  validateToken: async (req, _res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
      const e = new Error('Token not found');
      e.name = 'UnauthorizedError';
      throw e;
    }
    
    await jwtService.validateToken(authorization); 

    next();
  },
};

module.exports = authController; 