import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image } from "react-native";
import styles from "./style";
import { Icon } from "react-native-elements";
import { getProfile } from "../../utils/user/profileUser";
import { setProfileRedux } from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductsScreen from "../ProductsScreen";
import fetchOrderById from "../../utils/order/fetchOrderById";
export default function HomeVip({ navigation }) {
  const dispatch = useDispatch();
  const { numberOrder } = useSelector((state) => state.profile);
  const [orders, setOrders] = useState([]);
  const handleNavigate = (screen) => {
    navigation.navigate(screen); // Điều hướng đến màn hình tương ứng
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy userId và name từ hàm getProfile
        const { userId } = await getProfile();
        // Gọi API lấy dữ liệu giỏ hàng sau khi có userId
        if (userId) {
          await fetchOrderById(userId, "pending", setOrders); // Gọi API lấy giỏ hàng
        }
      } catch (error) {
        console.error("Error fetching profile or cart:", error);
      }
    };

    fetchData(); // Gọi hàm async trong useEffect
  }, []);
  const fetchProfile = async () => {
    try {
      const { userId, name, email } = await getProfile();
      dispatch(setProfileRedux({ userId, name, email }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  // Fetch profile when the component mounts or after a successful login
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.row_logo}>
        <Pressable
          onPress={() => handleNavigate("Profile")}
          style={styles.menuIcon}
        >
          <Icon name="account-circle" size={30} color="#000" />
        </Pressable>
        <Image
          source={require("../../assets/img/logo_stand.png")}
          style={styles.logo}
        />
        <Pressable
          style={styles.item_cart}
          onPress={() => handleNavigate("Cart")}
        >
          <Image
            source={require("../../assets/icon/cart_icon.png")}
            style={styles.img_item_service}
          />
          {(numberOrder || orders.length) && numberOrder !== 0 ? (
            <View style={styles.container_number_order}>
              <Text style={styles.number_order}>
                {numberOrder || orders.length}
              </Text>
            </View>
          ) : null}
        </Pressable>
      </View>
      <View style={styles.container_row_appoiment}>
        <View style={styles.row_appoiment}>
          <View>
            <Text style={styles.text_row_appoiment}>
              Làn da khỏe mạnh{"\n"}giúp bạn tự tin{"\n"}hơn mỗi ngày!
            </Text>
            <Pressable
              style={styles.view_more_articles}
              onPress={() => handleNavigate("Articles")}
            >
              <Text>Xem thêm</Text>
            </Pressable>
          </View>
          <Image
            source={require("../../assets/img/doctor_home.png")}
            style={styles.logo_doctor}
          />
        </View>
      </View>
      <ProductsScreen />
    </View>
  );
}
