const sequelize = require('sequelize');

const createPostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    tableName: 'PostCategories',
    timestamps: false,
  });

  PostCategory.associate = (model) => {
    model.Category.belongsToMany(model.BlogPost, {
      // as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      // otherKey: 'BlogPost',
    });

    model.BlogPost.belongsToMany(model.Category, {
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
      as: 'categories',
    });
  };

  return PostCategory;
};

module.exports = createPostCategory;