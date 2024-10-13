import API_APP from "../config";
const searchProductByName = async (text, idCategory, setProducts) => {
  try {
    const res = await fetch(
      `${API_APP}/v1/api/products?q=${text}&categoryId=${idCategory}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.message || "Something went wrong");
    }
    const data = await res.json();
    // console.log(data);
    setProducts(data.data.products);
  } catch (error) {
    console.log("Error fetching searchProductByName:", error.message || error);
  }
};
export default searchProductByName;
