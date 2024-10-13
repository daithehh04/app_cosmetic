import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import { scaleWidth } from "../utils/config";
export default function ItemCategory({
  selectedOption,
  category,
  handlePress,
}) {
  const { name, id } = category;
  //   console.log(category);
  return (
    <Pressable
      style={[styles.button, selectedOption === name && styles.activeButton]}
      onPress={() => handlePress(name, id)}
    >
      <Text
        style={[
          styles.buttonText,
          selectedOption === name && styles.activeButtonText,
        ]}
      >
        {name}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
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
