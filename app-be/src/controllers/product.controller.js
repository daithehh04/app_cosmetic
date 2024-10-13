const { SuccessResponse, CREATED } = require("../core/success.response.js");
const ProductService = require("../services/product.service.js");
class ProductController {
  static getAllProducts = async (req, res) => {
    new SuccessResponse({
      message: "Get all products Success!",
      data: await ProductService.getAllProducts(req.query),
    }).send(res);
  };

  static deleteProduct = async (req, res) => {
    new SuccessResponse({
      message: "Delete product success!",
      data: await ProductService.deleteProduct(req.params),
    }).send(res);
  };

  static updateProduct = async (req, res) => {
    new SuccessResponse({
      message: "Update product Success!",
      data: await ProductService.updateProduct(req.params, req.body),
    }).send(res);
  };

  static getProductDetail = async (req, res) => {
    new SuccessResponse({
      message: "Get product detail Success!",
      data: await ProductService.getProductDetail(req.params),
    }).send(res);
  };

  static createProduct = async (req, res) => {
    new CREATED({
      message: "Create product OK!",
      data: await ProductService.createProduct(req.body),
    }).send(res);
  };
}

module.exports = ProductController;
