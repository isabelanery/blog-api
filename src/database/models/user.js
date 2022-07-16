const sequelize = require('sequelize');

const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    timestamps: false,
  });

  User.associate = (model) => {
    User.hasMany(model.BlogPost, { as: 'posts', foreignKey: 'postId' })
  }

  return User;
};

module.exports = createUser;