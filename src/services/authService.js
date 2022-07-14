const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  login: async (email, password) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user && user.password !== password) {
      const e = new Error('Invalid fields');
      e.name = 'UnauthorizedError';
      throw e;
    }

    const token = jwtService.createToken(user);
    return token;
  },
};

module.exports = authService;