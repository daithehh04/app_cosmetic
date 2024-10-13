// ProfileScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // or any other icon set
import styles from "./style";
import { deleteProfile } from "../../utils/user/profileUser";
import { clearProfileRedux } from "../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { userId, email, name } = useSelector((state) => state.profile);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const navigation = useNavigation();
  const handleLogout = async () => {
    await deleteProfile();
    dispatch(clearProfileRedux());
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Icon name="account-circle" size={100} color="#ccc" />

        {/* Editable name field */}
        <View style={styles.infoContainer}>
          <Text style={styles.userName}>Họ Tên: {userName}</Text>
          <Text style={styles.userEmail}>Email: {userEmail}</Text>
        </View>

        {/* Update Name Button */}
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
