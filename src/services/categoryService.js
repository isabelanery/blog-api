const db = require('../database/models');

const categoryService = {
  create: async ({ name }) => {
    const newCategory = await db.Categories.create({ name });

    return newCategory;
  },
  list: async () => {
    const categories = await db.Categories.findAll();

    return categories;
  },
};

module.exports = categoryService;