const sequelize = require('sequelize');

const createCategory = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: DataTypes.STRING,
  }, {
    tableName: 'Categories',
    timestamps: false,
  });

  Category.associate = (model) => {
    Category.hasMany(model.PostCategory, {
      // as: 'categories',
      foreignKey: 'categoryId',
      // otherKey: 'postId',
      // through: model.PostCategory,
    });
  }

  return Category;
};

module.exports = createCategory;