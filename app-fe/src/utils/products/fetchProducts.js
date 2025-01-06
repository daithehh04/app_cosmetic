import instance from "../../api/api";
import API_APP from "../config";
const fetchProducts = async (setProducts) => {
  try {
    // const res = await fetch(`${API_APP}/v1/api/products`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (!res.ok) {
    //   const errData = await res.json();
    //   throw new Error(errData.message || "Something went wrong");
    // }
    // const data = await res.json();
    // setProducts(data.data.products);
    try {
      const response = await instance.get("/products");
      setProducts(response.data.data.products);
    } catch (error) {
      console.log("Error fetching:", error.message || error);
    }
  } catch (error) {
    console.log("Error fetching fetchProducts:", error.message || error);
  }
};
export default fetchProducts;
