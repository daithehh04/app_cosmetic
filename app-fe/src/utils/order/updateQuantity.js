import instance from "../../api/api";
const updateQuantity = async (id, quantity) => {
  try {
    const response = await instance.patch(
      `/order`,
      JSON.stringify({
        idOrder: id,
        payload: {
          quantity,
          status: "pending",
        },
      })
    );
    return response.data;
  } catch (error) {
    console.log("Error fetching updateQuantity:", error.message || error);
  }
};
export default updateQuantity;
