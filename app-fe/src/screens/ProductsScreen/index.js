import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, Pressable } from "react-native";
import styles from "./style";
import fetchProducts from "../../utils/products/fetchProducts";
import { SearchBar } from "react-native-elements";
// import {debounce} from '../../utils/debounce';
import debounce from "lodash.debounce";
import HorizontalScroll from "../../components/HorizontalScroll";
import ListProducts from "../../components/ListProducts";
import searchProductByName from "../../utils/products/searchProductByName";
import { useNavigation } from "@react-navigation/native";
export default function ProductsScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // const [selectedOption, setSelectedOption] = useState(null);
  const [idCategory, setIdCategory] = useState("");

  const updateSearch = (text) => {
    setSearch(text);
    debouncedSearch(text);
  };
  const debouncedSearch = useCallback(
    debounce((text) => searchProductByName(text, idCategory, setProducts), 500), // 500ms delay
    [idCategory]
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchProducts(setProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container_products}>
      <View style={styles.container_seach_bar}>
        <SearchBar
          placeholder="Tìm kiếm sản phẩm tại đây..."
          onChangeText={updateSearch}
          value={search}
          style={{ margin: 0, padding: 0 }}
          platform="default"
          placeholderTextColor="#888"
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          inputStyle={styles.searchBarInput}
        />
      </View>
      <HorizontalScroll
        search={search}
        setProducts={setProducts}
        setIdCategory={setIdCategory}
      />
      <ListProducts
        products={products}
        loading={loading}
        navigation={navigation}
      />
    </View>
  );
}
