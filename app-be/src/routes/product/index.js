"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const ProductController = require("../../controllers/product.controller");
const router = express.Router();

router.get("/products", asyncHandler(ProductController.getAllProducts));
router.get("/products/:id", asyncHandler(ProductController.getProductDetail));
router.patch("/products/:id", asyncHandler(ProductController.updateProduct));
router.post("/product", asyncHandler(ProductController.createProduct));
router.delete("/products/:id", asyncHandler(ProductController.deleteProduct));

module.exports = router;
