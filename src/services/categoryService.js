const db = require('../database/models');

const categoryService = {
  create: async ({ name }) => {
    const newCategory = await db.Category.create({ name });

    return newCategory;
  },
  list: async () => {
    const categories = await db.Category.findAll();

    return categories;
  },
};

module.exports = categoryService;