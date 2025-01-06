import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import StorageService from "../../service/StorageService";
import { setProfileRedux } from "../../store/slice/profileSlice";
import { useDispatch } from "react-redux";
import { setProfile } from "../../utils/user/profileUser";
import API_APP from "../../utils/config";

const OTPVerify = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Mảng chứa 6 chữ số OTP
  const inputRefs = useRef([]); // Khai báo mảng ref cho các TextInput
  const route = useRoute();
  const isRegister = route?.register;

  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [wrongNum, setWrongNum] = useState(0);
  const form = route.params;
  const handleInputChange = (value, index) => {
    setError(false);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Chuyển sang ô tiếp theo nếu người dùng nhập đầy đủ một ký tự
    if (value && index < 5) {
      inputRefs.current[index + 1].focus(); // Tự động focus vào ô kế tiếp
    }
  };

  const handleAfterVerify = async (result) => {
    const userId = result.data.user.id.toString();
    const name = result.data.user.name.toString();
    const email = result.data.user.email.toString();

    await StorageService.setKey("access_token", result.data.tokens.accessToken);
    await StorageService.setKey(
      "refresh_token",
      result.data.tokens.refreshToken
    );
    await StorageService.setKey("user_id", result.data.user.id.toString());
    setProfile(userId, name, email);
    dispatch(setProfileRedux({ userId, name, email }));
    // navigation.navigate("Home");
    navigation.reset({
      index: 0,
      routes: [{ name: "Home" }],
    });
  };
  const loginApp = async () => {
    try {
      const res = await fetch(`${API_APP}/v1/api/auth/login`, {
        method: "POST",
        body: JSON.stringify(form),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (!res.ok) {
        Alert.alert(
          "Đăng nhập thất bại!",
          "Tên đăng nhập hoặc mật khẩu không chính xác!"
        );
        return;
      }
      await handleAfterVerify(result);
    } catch (error) {
      Alert.alert("Login Failed");
    }
  };

  const registerApp = async () => {
    try {
      const { user_name, email, password } = form;
      const data = { name: user_name, email, password };
      const res = await fetch(`${API_APP}/v1/api/auth/signup`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        console.log(result.message);
        Alert.alert("Register Failed");
        return;
      }
      const result = await res.json();
      await handleAfterVerify(result);
    } catch (error) {
      Alert.alert("Register Failed", `${error?.message || error}`);
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    const otpCode = otp.join("");
    console.log("otpCode:", otpCode);
    try {
      const res = await fetch(`${API_APP}/v1/api/verify-code`, {
        method: "POST",
        body: JSON.stringify({
          email: form.email,
          code: otpCode,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      if (result.data) {
        if (isRegister) {
          registerApp();
        } else {
          loginApp();
        }
        setError(false);
      } else {
        setError(true);
        setWrongNum(wrongNum + 1);
      }
    } catch (error) {
      console.log("error::", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          position: "absolute",
          left: 10,
          top: 10,
        }}
        onPress={() => {
          if (isRegister) {
            navigation.navigate("Register");
          } else {
            navigation.navigate("Login");
          }
        }}
      >
        <Icon name="arrow-back" size={28} color="#000" />
        <Text>Quay lại</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Nhập mã xác nhận</Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            ref={(ref) => (inputRefs.current[index] = ref)} // Lưu ref của mỗi TextInput vào mảng
          />
        ))}
      </View>
      <View>
        {error && (
          <Text style={{ color: "red" }}>
            Mã OTP bạn nhập không chính xác.(Bạn còn {5 - wrongNum} lần nhập.)
          </Text>
        )}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor:
            otp.join("").length === 6 && 5 - wrongNum > 0
              ? "#FC427B"
              : "#bdc3c7",
          padding: 12,
          borderRadius: 5,
          marginTop: 12,
        }}
        onPress={handleSubmit}
        disabled={otp.join("").length !== 6 || 5 - wrongNum < 1}
      >
        <Text style={styles.submitButtonText}>Xác nhận</Text>
      </TouchableOpacity>
      <View>
        <Text
          style={{
            padding: 20,
            fontStyle: "italic",
          }}
        >
          (Mã xác nhận đã được gửi đến email của bạn. Và nó chỉ có hiệu lực
          trong vòng 1 phút!)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title1: {
    fontSize: 34,
    fontWeight: "700",
    color: "#27ae60",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: 4,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    fontSize: 24,
    textAlign: "center",
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OTPVerify;
