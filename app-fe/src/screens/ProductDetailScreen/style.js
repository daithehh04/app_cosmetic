import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 20 * scaleWidth,
  },
  row_rating: {
    display: "flex",
  },
  productImage: {
    width: "100%",
    height: 250 * scaleHeight,
    borderRadius: 15 * scaleWidth,
    marginVertical: 15 * scaleHeight,
    resizeMode: "cover",
  },
  detailContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 15 * scaleWidth,
    padding: 20 * scaleWidth,
    marginBottom: 20 * scaleHeight,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8 * scaleWidth,
    elevation: 3,
  },
  productName: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10 * scaleHeight,
  },
  productDescription: {
    fontSize: 16 * scaleWidth,
    color: "#666",
    marginBottom: 20 * scaleHeight,
    lineHeight: 22 * scaleWidth,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10 * scaleHeight,
  },
  newPrice: {
    fontSize: 24 * scaleWidth,
    fontWeight: "bold",
    color: "#fc036f",
    marginRight: 10 * scaleWidth,
  },
  oldPrice: {
    fontSize: 20 * scaleWidth,
    color: "#4d4b4c",
    textDecorationLine: "line-through",
    textDecorationStyle: "solid",
  },
  rating: {
    marginBottom: 14 * scaleHeight,
  },
  rate_star: {
    marginRight: "auto",
  },
  buyButton: {
    backgroundColor: "#fc036f",
    paddingVertical: 15 * scaleWidth,
    borderRadius: 5,
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 18 * scaleWidth,
    color: "#fff",
    fontWeight: "bold",
  },
});
export default styles;
