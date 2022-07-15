const authService = require('../services/authService');
const categoryService = require('../services/categoryService');
// const jwtService = require('../services/jwtService');

const categoryController = {
  create: async (req, res) => {
    const { name } = await authService.validateCategory(req.body);

    const category = await categoryService.create({ name });

    res.status(201).json(category);
  },
  list: async (_req, res) => {
    const categories = await categoryService.list();

    res.status(200).json(categories);
  },
};

module.exports = categoryController;