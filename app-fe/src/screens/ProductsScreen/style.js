import { StyleSheet } from "react-native";
import { scaleHeight, scaleWidth } from "../../utils/config";
const styles = StyleSheet.create({
  container_products: {
    flex: 1,
    marginBottom: 20 * scaleHeight,
  },
  row_title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title_product: {
    fontSize: 20 * scaleWidth,
    color: "black",
  },
  img_item_service: {
    width: 30 * scaleWidth,
    height: 30 * scaleHeight,
    color: "white",
  },
  container_seach_bar: {
    marginVertical: 1 * scaleHeight,
  },
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
  },
  searchBarInputContainer: {
    backgroundColor: "#fff",
    borderRadius: 15 * scaleWidth,
  },
  searchBarInput: {
    color: "#333",
  },
  contaniner_note: {
    padding: 20 * scaleWidth,
    borderRadius: 16 * scaleWidth,
    backgroundColor: "#FEF7E6",
    flexDirection: "row",
    columnGap: 10 * scaleWidth,
    elevation: 3 * scaleWidth,
    marginBottom: 5 * scaleWidth,
    justifyContent: "space-between",
  },
  container_icon_note: {
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    width: 10 * scaleWidth,
    height: 10 * scaleHeight,
  },
  text_title_note: {
    fontWeight: "bold",
    color: "black",
    fontSize: 20 * scaleWidth,
  },
  text_content_note: {
    fontSize: 12 * scaleWidth,
    color: "#333333",
  },
  icon_arrow: {
    color: "#666666",
    width: 15 * scaleWidth,
    height: 15 * scaleHeight,
  },
});
export default styles;
