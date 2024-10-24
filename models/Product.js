// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      // decimal
      type: DataTypes.DECIMAL,
      // doesn't allow null values
      allowNull: false,
      // validates that the value is a decimal
      validate: {
        isDecimal: true,
      },
    },
    stock: {
      // integer
      type: DataTypes.INTEGER,
      // doesn't allow null values
      allowNull: false,
      // set a default value of 10
      defaultValue: 10,
      // validates that the value is numeric
      validate: {
        isNumeric: true,
      }
    },
    category_id: {
      // integer
      type: DataTypes.INTEGER,
      // references the Category model's id
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
