const db = require('../database/models');

const categoryService = {
  create: async ({ name }) => {
    const newCategory = await db.Categories.create({ name });

    return newCategory;
  },
};

module.exports = categoryService;