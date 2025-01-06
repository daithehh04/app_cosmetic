import instance from "../../api/api";
const fetchLogout = async () => {
  try {
    const response = await instance.post(`/auth/logout`, {});
    return response.data;
  } catch (error) {}
};
export default fetchLogout;
