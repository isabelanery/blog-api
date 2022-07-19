const Joi = require('joi');
const db = require('../database/models');
const jwtService = require('./jwtService');

const authService = {
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
  validateNewUser: async (params) => {
    const schema = Joi.object({
      displayName: Joi.string().min(8).required()
        .messages({ 'string.min': '"displayName" length must be at least 8 characters long' }),
      email: Joi.string().email().required()
        .messages({ 'string.email': '"email" must be a valid email' }),
      password: Joi.string().min(6).required()
        .messages({ 'string.min': '"password" length must be at least 6 characters long' }),
      image: Joi.string(),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    const emailAlreadyExist = await db.User.findOne({ where: { email: params.email } });

    if (emailAlreadyExist) {
      const e = new Error('User already registered');
      e.name = 'ConflictError';
      throw e;
    }

    return value;
  },
  validateCategory: async (params) => {
    const schema = Joi.object({
      name: Joi.string().min(1).required()
        .messages({ 'string.required': '"name" is required' }),
    });

    const { error, value } = schema.validate(params);

    if (error) throw error;

    return value;
  },
  validateBlogPost: async (params) => {
    const schema = Joi.object({ title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required(),
    });

    const { error, value } = schema.validate(params);

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }

    const validateCategories = await Promise.all(params.categoryIds
      .map(async (category) => db.Category.findByPk(category)));

    if (validateCategories.some((item) => !item)) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      throw e;
    }

    return value;
  },
  validateUpdate: async ({ title, content, userId, postId }) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });

    const { error, value } = schema.validate({ title, content });

    if (error) {
      const e = new Error('Some required fields are missing');
      e.name = 'ValidationError';
      throw e;
    }

    const userOwnsPost = await db.BlogPost.findOne({ where: { id: postId, userId } });
    
    if (!userOwnsPost) {
      const e = new Error('Unauthorized user');
      e.name = 'UnauthorizedError';
      throw e;
    }

    return value;
  },
};

module.exports = authService;