const { BadRequestError } = require("../core/error.response");
const { CategoryProduct } = require("../models/index");
class CategoryProductService {
  static getAllCategoryProduct = async ({ page, limit }) => {
    const options = {
      order: [["created_at", "desc"]],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const { rows: categoryProduct, count } =
      await CategoryProduct.findAndCountAll(options);
    return {
      categoryProduct,
      count,
    };
  };

  static createCategoryProduct = async (payload) => {
    const { name } = payload;
    const categoryProduct = await CategoryProduct.findOne({
      where: { name },
    });
    if (categoryProduct) {
      throw new BadRequestError("Category exist!");
    }
    const category = await CategoryProduct.create(payload);
    if (!category) throw new BadRequestError("Create Category error");
    return category;
  };

  static updateCategoryProduct = async ({ id }, payload) => {
    const categoryProduct = await CategoryProduct.findByPk(id);
    if (!categoryProduct) {
      throw new NotFoundError("categoryProduct not found!");
    }
    await CategoryProduct.update(payload, {
      where: {
        id,
      },
    });
  };

  static deleteCategoryProduct = async ({ id }) => {
    const categoryProduct = await CategoryProduct.findByPk(id);
    if (!categoryProduct) {
      throw new NotFoundError("CategoryProduct not found!");
    }
    const deleted = await categoryProduct.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
}

module.exports = CategoryProductService;
