import API_APP from "../config";
const fetchProductsCategories = async (setCategories) => {
  try {
    const res = await fetch(`${API_APP}/v1/api/category-product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    setCategories(data.data.categoryProduct.reverse());
  } catch (error) {
    console.log(error);
  }
};
export default fetchProductsCategories;
