import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Pressable,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CartItem from "../../components/ItemCart"; // Đảm bảo bạn đã tạo CartItem component
import fetchOrderById from "../../utils/order/fetchOrderById";
import { getProfile } from "../../utils/user/profileUser";
import deleteOrderById from "../../utils/order/deleteOrderById";
import updateQuantity from "../../utils/order/updateQuantity";
import paymentCart from "../../utils/order/paymentCart";
import formatCurrency from "../../utils/formatMoney";
import styles from "./style";
import createPaymentIntent from "../../utils/payment/createPaymentIntent";
import { useStripe } from "@stripe/stripe-react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setNumberOrder } from "../../store/slice/profileSlice";
const CartScreen = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemsSelected, setItemsSelected] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { userId, email, name } = useSelector((state) => state.profile);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setNumberOrder({ numberOrder: items.length }));
  }, [items.length]);
  const increaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    await updateQuantity(id, quantity + 1);
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = async (id) => {
    const quantity = items.find((item) => item.id === id).quantity;
    if (+quantity === 1) {
      await deleteItem(id);
    } else {
      await updateQuantity(id, quantity - 1);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const deleteItem = async (id) => {
    await deleteOrderById(id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const paymentCarts = async () => {
    try {
      const responseCreatePaymentIntent = await createPaymentIntent(
        totalAmount
      );
      if (!responseCreatePaymentIntent) {
        throw new Error(responseCreatePaymentIntent.error);
      }
      const responseInitPayment = await initPaymentSheet({
        merchantDisplayName: "notJust.dev",
        paymentIntentClientSecret: responseCreatePaymentIntent.paymentIntent,
        customerId: userId,
        returnURL: "myapp://stripe-redirect",
      });
      if (responseInitPayment.error) {
        throw new Error(responseInitPayment.error);
      }
      const responsePaymentSheet = await presentPaymentSheet();
      if (responsePaymentSheet.error) {
        throw new Error(responsePaymentSheet.error);
      }
      // if payment ok - > create order, change status, change item carts
      itemsSelected.map(async (id) => {
        await paymentCart(id);
      });
      Alert.alert("Thanh toán thành công");
      setItems((prevItems) =>
        prevItems.filter((item) => !itemsSelected.includes(item.id))
      );
      setItemsSelected([]);
    } catch (e) {
      return;
    }
  };
  const selectItem = (id) => {
    console.log(id);
    if (itemsSelected.includes(id)) {
      setItemsSelected(itemsSelected.filter((item) => item !== id));
    } else {
      setItemsSelected([...itemsSelected, id]);
    }
  };
  useEffect(() => {
    const total = items
      .filter((item) => itemsSelected.includes(item.id))
      .reduce((total, item) => total + item.new_price * item.quantity, 0);
    setTotalAmount(total);
  }, [itemsSelected]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Lấy userId và name từ hàm getProfile
        const { userId, name } = await getProfile();
        // Gọi API lấy dữ liệu giỏ hàng sau khi có userId
        if (userId) {
          await fetchOrderById(userId, "pending", setItems); // Gọi API lấy giỏ hàng
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile or cart:", error);
      }
    };

    fetchData(); // Gọi hàm async trong useEffect
  }, []);

  if (loading) {
    return <Text>Loading....</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.title}>Giỏ Hàng</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Image source={require("../../assets/icon/close_icon.png")} />
        </Pressable>
      </View>

      {items.length ? (
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <CartItem
              item={item}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
              onDelete={deleteItem}
              selectItem={selectItem}
              itemsSelected={itemsSelected}
            />
          )}
          keyExtractor={(item) => item.id}
          style={styles.list}
        />
      ) : (
        <View style={styles.noCart}>
          <Icon name="cart" size={40} />
          <Text style={styles.textNoProduct}>Không có sản phẩm nào</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <Text style={styles.checkoutButtonText}>Mua ngay</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.totalText}>Thành Tiền:</Text>
        <Text style={styles.totalAmount}>{formatCurrency(totalAmount)}</Text>
        <TouchableOpacity
          disabled={!items.length}
          style={styles.checkoutButton}
          onPress={paymentCarts}
        >
          <Text style={styles.checkoutButtonText}>Thanh Toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
