import axios from "axios";
import API_APP from "../utils/config";
import StorageService from "../service/StorageService";

const instance = axios.create({
  baseURL: `${API_APP}/v1/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor thêm access token vào header
instance.interceptors.request.use(async (config) => {
  const token = await StorageService.getKey("access_token");
  const userId = await StorageService.getKey("user_id");
  if (token && userId) {
    config.headers["authorization"] = token;
    config.headers["x-client-id"] = userId;
  }
  return config;
});

// Interceptor xử lý refresh token khi access token hết hạn
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Thử refresh token
      const refreshToken = await StorageService.getKey("refresh_token");
      const userId = await StorageService.getKey("user_id");
      if (refreshToken) {
        try {
          const res = await axios.post(
            `${API_APP}/v1/api/auth/handlerRefreshToken`,
            {
              refreshToken,
              userId,
            }
          );
          // Lưu token mới
          const { accessToken, refreshToken: newRefreshToken } =
            res.data.data.tokens;
          await StorageService.setKey("access_token", accessToken);
          await StorageService.setKey("refresh_token", newRefreshToken);

          // Thử lại request ban đầu
          error.config.headers["authorization"] = `${accessToken}`;
          error.config.headers["x-client-id"] = `${userId}`;
          return instance.request(error.config);
        } catch (refreshError) {
          console.error("Refresh token failed:", refreshError);
          // Xóa token và điều hướng về màn hình login
          await StorageService.delKey("access_token");
          await StorageService.delKey("refresh_token");
          // Điều hướng: Thay đổi logic này theo Navigator bạn dùng
          // navigation.navigate("LoginScreen");
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
