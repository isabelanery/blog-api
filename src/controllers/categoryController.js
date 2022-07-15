const authService = require('../services/authService');
const categoryService = require('../services/categoryService');
// const jwtService = require('../services/jwtService');

const categoryController = {
  create: async (req, res) => {
    // const { name } = req.body;
    const { name } = await authService.validateCategory(req.body);

    const category = await categoryService.create({ name });

    res.status(201).json(category);
  },
};

module.exports = categoryController;