import * as SecureStore from "expo-secure-store";

class StorageServiceClass {
  /**
   * Lấy giá trị theo key
   * @param {string} key
   * @returns {Promise<string | null>}
   */
  getKey = async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value; // Trả về null nếu không tồn tại
    } catch (error) {
      console.error("Error getting key:", key, error);
      throw error;
    }
  };

  /**
   * Lưu giá trị theo key
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   */
  setKey = async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value, {
        keychainAccessible: SecureStore.WHEN_UNLOCKED,
      });
    } catch (error) {
      console.error("Error setting key:", key, error);
      throw error;
    }
  };

  /**
   * Xóa giá trị theo key
   * @param {string} key
   * @returns {Promise<void>}
   */
  delKey = async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("Error deleting key:", key, error);
      throw error;
    }
  };
}

const StorageService = new StorageServiceClass();
export default StorageService;
