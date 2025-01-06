import instance from "../../api/api";
const fetchProductsCategories = async (setCategories) => {
  try {
    const response = await instance.get(`/category-product`);
    setCategories(response.data.data.categoryProduct.reverse());
  } catch (error) {
    console.log(error);
  }
};
export default fetchProductsCategories;
