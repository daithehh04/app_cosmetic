import instance from "../../api/api";
const searchProductByName = async (text, idCategory, setProducts) => {
  try {
    const response = await instance.get(
      `/products?q=${text}&categoryId=${idCategory}`
    );
    setProducts(response.data.data.products);
  } catch (error) {
    console.log("Error fetching:", error.message || error);
  }
};
export default searchProductByName;
