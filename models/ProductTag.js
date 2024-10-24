const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model { }

ProductTag.init(
  {
    // define columns
    id: {
      // integer
      type: DataTypes.INTEGER,
      // doesn't allow null values
      allowNull: false,
      // set as primary key
      primaryKey: true,
      // uses autoincrement
      autoIncrement: true,
    },

    product_id: {
      // integer
      type: DataTypes.INTEGER,
      // references the Product model's id
      references: {
        model: 'product',
        key: 'id',
      },
    },
    tag_id: {
      // integer
      type: DataTypes.INTEGER,
      // references the Tag model's id
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
