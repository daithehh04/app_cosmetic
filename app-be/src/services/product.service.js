const { Op } = require("sequelize");
const { NotFoundError, BadRequestError } = require("../core/error.response");
const { Product, CategoryProduct } = require("../models/index");
class ProductService {
  static getAllProducts = async ({ page, limit, categoryId, q }) => {
    const options = {
      order: [["created_at", "desc"]],
      include: [
        {
          model: CategoryProduct,
          as: "categoryProduct",
          attributes: ["id", "name"],
        },
      ],
    };
    if (!+page || page < 0) {
      page = 1;
    }

    if (limit && Number.isInteger(+limit)) {
      options.limit = limit;
      const offset = (page - 1) * limit;
      options.offset = offset;
    }

    const filter = {};
    if (categoryId) {
      filter.category_product_id = +categoryId;
    }

    if (q) {
      filter.name = { [Op.iLike]: `%${q}%` };
    }

    options.where = filter;

    const { rows: products, count } = await Product.findAndCountAll(options);
    return {
      products,
      count,
    };
  };

  static deleteProduct = async ({ id }) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError("Product not found!");
    }
    const deleted = await Product.destroy({
      where: {
        id,
      },
    });
    return deleted;
  };
  static updateProduct = async (id, payload) => {
    const product = await Product.findByPk(id.id);
    if (!product) {
      throw new NotFoundError("Product not found!");
    }
    await Product.update(payload, {
      where: {
        id: id.id,
      },
    });
  };
  static getProductDetail = async ({ id }) => {
    const product = await Product.findByPk(id);
    if (!product) {
      throw new NotFoundError("Product không tồn tại!");
    }
    return product;
  };
  static createProduct = async (payload) => {
    const {
      name,
      old_price,
      new_price,
      description,
      image,
      rate,
      category_product_id,
    } = payload;
    const product = await Product.create(payload);
    if (!product) throw new BadRequestError("Create product error");
    return product;
  };
}

module.exports = ProductService;
