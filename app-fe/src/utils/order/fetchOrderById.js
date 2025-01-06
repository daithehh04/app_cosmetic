import instance from "../../api/api";

const fetchOrderById = async (id, status, setOrder) => {
  try {
    const response = await instance.get(
      `/orders?userId=${id}&status=${status}`
    );
    setOrder(response.data.data.carts);
  } catch (error) {
    console.log("Error fetching fetchOrderById ", error.message || error);
  }
};
export default fetchOrderById;
