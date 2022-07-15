const sequelize = require('sequelize');

const createCategory = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
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

  return Categories;
};

module.exports = createCategory;