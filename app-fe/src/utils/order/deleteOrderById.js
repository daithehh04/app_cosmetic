import instance from "../../api/api";

const deleteOrderById = async (id) => {
  // http://localhost:3000/v1/api/order/9
  try {
    const response = await instance.delete(`/order/${id}`, {});
    return response.data;
  } catch (error) {
    console.log("Error fetching deleteOrderById ", error.message || error);
  }
};
export default deleteOrderById;
