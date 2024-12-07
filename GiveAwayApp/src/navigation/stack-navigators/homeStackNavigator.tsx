import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Colors } from "../../utils/colors/colors";
import HomeScreen from "../../scene/home";
import ProductDetailsScreen from "../../scene/productTab/detail";

const HomeStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
      <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
