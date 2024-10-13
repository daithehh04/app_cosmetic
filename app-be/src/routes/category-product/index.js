"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const {
  getAllCategoryProduct,
  createCategoryProduct,
  updateCategoryProduct,
  deleteCategoryProduct,
} = require("../../controllers/category-product.controller");
const router = express.Router();

router.get("/category-product", asyncHandler(getAllCategoryProduct));
router.patch("/category-product/:id", asyncHandler(updateCategoryProduct));
router.delete("/category-product/:id", asyncHandler(deleteCategoryProduct));
router.post("/category-product", asyncHandler(createCategoryProduct));

module.exports = router;
