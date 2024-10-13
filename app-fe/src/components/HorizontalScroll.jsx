import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import fetchProductsCategories from "../utils/products/fetchProductCategories";
import ItemCategory from "./ItemCategory";
import { scaleHeight, scaleWidth } from "../utils/config";
import searchProductByName from "../utils/products/searchProductByName";
const HorizontalScroll = ({ setProducts, setIdCategory, search }) => {
  const [categories, setCategories] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const handlePressAll = async (name) => {
    setSelectedOption(name);
    setIdCategory("");
    try {
      await searchProductByName(search, "", setProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const handlePress = async (name, id) => {
    console.log(name, id);
    setIdCategory(id);
    setSelectedOption(name);
    try {
      await searchProductByName(search, id, setProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProductsCategories(setCategories);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
      >
        <Pressable
          style={[
            styles.button,
            selectedOption === "all" && styles.activeButton,
          ]}
          onPress={() => handlePressAll("all")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption === "all" && styles.activeButtonText,
            ]}
          >
            All
          </Text>
        </Pressable>
        {categories.map((item, index) => {
          return (
            <ItemCategory
              key={index}
              category={item}
              handlePress={handlePress}
              selectedOption={selectedOption}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10 * scaleWidth,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    height: 60 * scaleHeight,
  },
  contentContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    borderRadius: 15 * scaleWidth,
    padding: 10 * scaleWidth,
    marginHorizontal: 10 * scaleWidth,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16 * scaleWidth,
    color: "#000",
  },
  activeButton: {
    backgroundColor: "#fc036f",
  },
  activeButtonText: {
    color: "#fff",
  },
});

export default HorizontalScroll;
