import React from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import ItemProducts from "./ItemProduct";
import { scaleHeight, scaleWidth } from "../utils/config";
export default function ListProducts({ navigation, products, loading }) {
  return (
    <View style={styles.view_holder}>
      {loading ? ( // Show loading indicator while fetching
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={({ item, index }) => (
            <ItemProducts key={index} item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  view_holder: {
    paddingRight: 3 * scaleWidth,
  },
  title_product: {
    fontSize: 20 * scaleWidth,
    fontWeight: "bold",
    marginLeft: 15 * scaleWidth,
    marginBottom: 10,
  },
  container: {
    paddingBottom: 155 * scaleHeight,
  },
  row: {
    justifyContent: "space-between", // Space between items in each row
    marginBottom: 10, // Space between rows
  },
  loadingContainer: {
    flex: 1,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Background color
  },
});
