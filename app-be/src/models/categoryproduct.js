"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategoryProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CategoryProduct.hasMany(models.Product, {
        foreignKey: "category_product_id",
        as: "products",
      });
    }
  }
  CategoryProduct.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "product_category",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "CategoryProduct",
    }
  );
  return CategoryProduct;
};
