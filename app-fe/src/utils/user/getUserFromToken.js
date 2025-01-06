import instance from "../../api/api";
const getUserFromToken = async (data) => {
  try {
    const response = await instance.post(
      `/auth/getUserFromToken`,
      JSON.stringify(data)
    );
    return response.data;
  } catch (error) {}
};
export default getUserFromToken;
