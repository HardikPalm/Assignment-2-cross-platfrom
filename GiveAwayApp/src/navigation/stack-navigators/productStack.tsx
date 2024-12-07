import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ProductDetailsScreen from "../../scene/productTab/detail";
import ProductTabScreen from "../../scene/productTab";

const PlaylistStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ProductTabScreen"
        component={ProductTabScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="ProductDetailsScreen1"
        component={ProductDetailsScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default PlaylistStack;
