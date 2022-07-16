const sequelize = require('sequelize');

const createBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
  }, {
    tableName: 'BlogPosts',
    timestamps: false,
  });

  BlogPost.associate = (model) => {
    BlogPost.belongsTo(model.User, {
      foreignKey: 'userId',
      as: 'user'
    }); 

    BlogPost.hasMany(model.PostCategory, { as: 'postCategory', foreignKey: 'postId' });
  }


  return BlogPost;
};

module.exports = createBlogPost;