import StorageService from "../../service/StorageService";

const getProfile = async () => {
  try {
    const userId = await StorageService.getKey("user_id");
    const email = await StorageService.getKey("email");
    const name = await StorageService.getKey("name");
    if (userId !== null && name !== null && email !== null) {
      console.log("--------------------------------------");
    }
    return { userId, name, email };
  } catch (e) {
    console.error("Failed to retrieve the profile user", e);
  }
};
const setProfile = async (userId, name, email) => {
  try {
    console.log("set profile");
    await StorageService.setKey("user_id", userId);
    await StorageService.setKey("name", name);
    await StorageService.setKey("email", email);
  } catch (e) {
    console.error("Failed to save the profile user", e);
  }
};
const deleteProfile = async () => {
  try {
    await StorageService.delKey("user_id");
    await StorageService.delKey("email");
    await StorageService.delKey("name");
    await StorageService.delKey("access_token");
    await StorageService.delKey("refresh_token");
  } catch (e) {
    console.error("Failed to delete the profile.", e);
  }
};
const getUserId = async () => {
  try {
    const userId = await StorageService.getKey("@user_id");
    if (userId !== null) {
      console.log("User ID:", userId);
      // Do something with the user ID, e.g., navigate to the home screen
    }
    return userId;
  } catch (e) {
    console.error("Failed to retrieve the user ID.", e);
  }
};
const getUserName = async () => {
  try {
    const name = await StorageService.getKey("name");
    console.log("take user name");
    if (name !== null) {
      console.log("Name:", name);
    }
    return name;
  } catch (e) {
    console.error("Failed to retrieve the name.", e);
  }
};
const setUserId = async (userId) => {
  try {
    await StorageService.setKey("user_id", userId);
    console.log("User ID saved successfully");
  } catch (e) {
    console.error("Failed to save the user ID.", e);
  }
};

const setUserName = async (username) => {
  try {
    await StorageService.setKey("name", username);
    console.log("User username saved successfully");
  } catch (e) {
    console.error("Failed to save the user name.", e);
  }
};
export {
  setUserId,
  getUserId,
  getUserName,
  setUserName,
  getProfile,
  setProfile,
  deleteProfile,
};
