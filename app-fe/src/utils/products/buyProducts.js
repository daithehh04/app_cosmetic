import toastCustom from "../notifications/toastCustom";
import { Platform, Alert } from "react-native";
import instance from "../../api/api";
const buyProducts = async (data) => {
  try {
    await instance.post("/order", JSON.stringify(data));
    if (Platform.OS === "android") {
      toastCustom("Order created successfully");
    } else {
      Alert.alert("Notification", "Order created successfully");
    }
  } catch (error) {
    console.log("Error fetching:", error.message || error);
  }
};
export default buyProducts;
