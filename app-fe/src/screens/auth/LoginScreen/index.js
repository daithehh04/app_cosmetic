import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from "react-native";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome6";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import GradientButton from "../../../components/GradientButton";
import { setProfile, getProfile } from "../../../utils/user/profileUser";
import { setProfileRedux } from "../../../store/slice/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import API_APP from "../../../utils/config"; // lay bien moi truong
import StorageService from "../../../service/StorageService";
export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { userId, name, email } = useSelector((state) => state.profile);
  console.log(userId, name, email);
  const [isSecure, setIsSecure] = useState(true);

  const toggleSecureEntry = () => {
    setIsSecure(!isSecure);
  };
  const schema = yup.object().shape({
    email: yup.string().required("Email is required").email("Invalid email"),
    password: yup.string().required("Password is required"),
  });
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onPressSend = async (formData) => {
    try {
      const res = await fetch(`${API_APP}/v1/api/send-code`, {
        method: "POST",
        body: JSON.stringify({
          ...formData,
          isSignUp: false,
          isSignIn: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await res.json();
      console.log("result::", result);

      if (result?.data?.status === 200) {
        navigation.reset({
          routes: [{ name: "OTPVerify", params: formData }],
        });
      } else if (result?.data?.spam) {
        Alert.alert(
          "Đăng nhập thất bại!",
          "Bạn đã yêu cầu OTP quá nhiều lần, vui lòng thử lại sau 24 giờ."
        );
        return;
      } else {
        Alert.alert(
          "Đăng nhập thất bại!",
          "Tên đăng nhập hoặc mật khẩu không chính xác!"
        );
        return;
      }
    } catch (error) {
      Alert.alert(
        "Đăng nhập thất bại!",
        "Tên đăng nhập hoặc mật khẩu không chính xác!"
      );
      return;
    }
  };
  useEffect(() => {
    const checkProfile = async () => {
      const profile = await getProfile();
      if (profile.userId && profile.name && profile.email) {
        dispatch(setProfileRedux({ userId, name, email }));
        // Navigate to Home if the user is already logged in
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      }
    };
    checkProfile();
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/img/logo_stand.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome back !</Text>
      <View style={styles.container_input}>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Email của bạn"
              style={styles.input}
            />
          )}
          name="email"
        />
        <View style={styles.container_error}>
          {errors.email && (
            <Text style={styles.text_error}>{errors.email.message}</Text>
          )}
        </View>
        <View style={styles.container_icon_input}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Password"
                secureTextEntry={isSecure}
                style={[styles.input, styles.input_password]}
              />
            )}
            name="password"
          />
          <View style={styles.icon_eye}>
            <TouchableOpacity onPress={toggleSecureEntry}>
              <Icon
                name={isSecure ? "eye" : "eye-slash"}
                size={15}
                color="#000"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_error}>
          {errors.password && (
            <Text style={styles.text_error}>{errors.password.message}</Text>
          )}
        </View>
      </View>
      <View style={styles.container_btn_submit}>
        <GradientButton title="Đăng nhập" onPress={handleSubmit(onPressSend)} />
      </View>
      <View style={styles.container_link_register}>
        <Text>Chưa có tài khoản ?</Text>
        <Pressable onPress={() => navigation.navigate("Register")}>
          <Text style={styles.text_link_register}>Đăng kí</Text>
        </Pressable>
      </View>
    </View>
    // </ImageBackground>
  );
}
