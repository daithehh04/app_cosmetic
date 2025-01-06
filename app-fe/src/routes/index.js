import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedRoute from "../components/ProtectedRoute";
import HomeVip from "../screens/HomeScreen";
import CartScreen from "../screens/CartScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ArticlesScreen from "../screens/ArticlesScreen";
import TermsPrivacyScreen from "../components/TermsPrivacyScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ProductsScreen from "../screens/ProductsScreen";
import ArcilesDetailsScreen from "../screens/ArctilesDetailsScreen";
import ProfileScreen from "../screens/Profile";
import { useSelector } from "react-redux";
import OTPVerify from "../screens/OTPVerify";
const Stack = createNativeStackNavigator();
const Routes = () => {
  const { userId } = useSelector((state) => state.profile);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={HomeVip}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Articles"
          component={ArticlesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ArctilesDetails"
          component={ArcilesDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TermsPrivacyScreen"
          component={TermsPrivacyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerify"
          component={OTPVerify}
          options={{ headerShown: false }}
        />
        {/* // comment require Login */}
        <Stack.Screen name="ProductDetail" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <ProductDetailScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <ProfileScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
        <Stack.Screen name="Cart" options={{ headerShown: false }}>
          {() => (
            <ProtectedRoute>
              <CartScreen />
            </ProtectedRoute>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Routes;
