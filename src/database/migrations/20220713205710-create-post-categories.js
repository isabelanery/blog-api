'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('PostCategories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        primaryKey: true,
        references: {
          model: 'BlogPosts',
          key: 'id',
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'category_id',
        primaryKey: true,
        references: {
          model: 'Categories',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('PostCategories');
  }
};