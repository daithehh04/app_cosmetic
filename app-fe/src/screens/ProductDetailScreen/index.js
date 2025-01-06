import React, { useState } from "react";
import { View, Image, ScrollView, Pressable } from "react-native";
import { Text } from "react-native";
import styles from "./style";
import formatCurrency from "../../utils/formatMoney";
import { getProfile } from "../../utils/user/profileUser";
import buyProducts from "../../utils/products/buyProducts";
import BuyProductModal from "../../components/Modal/BuyProductModal";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { Rating } from "react-native-ratings";
export default function ProductDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params;
  const [product, setProduct] = useState(item);
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleBuyPress = () => {
    setModalVisible(true);
  };
  const handleBuyProduct = async () => {
    const { userId } = await getProfile();
    const data = {
      user_id: +userId,
      product_id: product.id,
      quantity,
      status: "pending",
      image: product.image,
      name: product.name,
      description: product.description,
      old_price: product.old_price,
      new_price: product.new_price,
    };
    await buyProducts(data);
    setQuantity(1);
    setModalVisible(false);
    navigation.navigate("Cart");
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setQuantity(1);
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.detailContainer}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.rating}>
          <Rating
            startingValue={product.rate}
            imageSize={20}
            readonly
            style={styles.rate_star}
          />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.newPrice}>
            {formatCurrency(product.new_price)}
          </Text>
          {item.old_price && (
            <Text style={styles.oldPrice}>
              {formatCurrency(product.old_price)}
            </Text>
          )}
        </View>

        <Pressable style={styles.buyButton} onPress={handleBuyPress}>
          <Text style={styles.buyButtonText}>Mua ngay</Text>
        </Pressable>
      </View>
      {modalVisible && (
        <BuyProductModal
          modalVisible={modalVisible}
          item={product}
          handleCloseModal={handleCloseModal}
          handleDecrease={handleDecrease}
          handleIncrease={handleIncrease}
          handleBuyProduct={handleBuyProduct}
          quantity={quantity}
        />
      )}
    </ScrollView>
  );
}
