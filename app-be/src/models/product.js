"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.CategoryProduct, {
        foreignKey: "category_product_id",
        as: "categoryProduct",
      });
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_product_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      old_price: DataTypes.FLOAT,
      new_price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      image: DataTypes.STRING,
      rate: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Product;
};
