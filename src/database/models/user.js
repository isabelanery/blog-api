const sequelize = require('sequelize');

const createUser = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    tableName: 'Users',
    timestamps: false,
    underscored: true,
  });

  return User;
};

module.exports = createUser;