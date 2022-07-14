const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
  // login: async (email, password) => {
  //   const user = await db.User.findOne({ where: { email } });

  //   if (!user && user.password !== password) {
  //     const e = new Error('Invalid fields');
  //     e.name = 'UnauthorizedError';
  //     throw e;
  //   }

  //   const token = jwtService.createToken(user);
  //   return token;
  // },
  validateBody: (params) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error, value } = schema.validate(params);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }

    return value;
  },
  validateLogin: async ({ email, password }) => {
    const user = await db.User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      const e = new Error('Invalid fields');
      e.name = 'ValidationError';
      throw e;
    }

    const { password: senha, ...userWithoutPassword } = user;

    const token = await jwtService.createToken(userWithoutPassword.dataValues);

    return token;
  },
};

module.exports = authService;