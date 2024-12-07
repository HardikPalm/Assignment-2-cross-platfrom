import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Profile from "../../scene/profile";
import AddProductScreen from "../../scene/addProducts";
const ProfileStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;
