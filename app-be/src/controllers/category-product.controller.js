const { SuccessResponse, CREATED } = require("../core/success.response.js");
const CategoryProductService = require("../services/category-product.service.js");
class CategoryProductController {
  static getAllCategoryProduct = async (req, res) => {
    new SuccessResponse({
      message: "Get all category product Success!",
      data: await CategoryProductService.getAllCategoryProduct(req.query),
    }).send(res);
  };

  static createCategoryProduct = async (req, res) => {
    new CREATED({
      message: "Create Category product OK!",
      data: await CategoryProductService.createCategoryProduct(req.body),
    }).send(res);
  };

  static updateCategoryProduct = async (req, res) => {
    new SuccessResponse({
      message: "Update category product Success!",
      data: await CategoryProductService.updateCategoryProduct(
        req.params,
        req.body
      ),
    }).send(res);
  };

  static deleteCategoryProduct = async (req, res) => {
    new SuccessResponse({
      message: "Delete category product Success!",
      data: await CategoryProductService.deleteCategoryProduct(req.params),
    }).send(res);
  };
}

module.exports = CategoryProductController;
