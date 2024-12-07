import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Colors } from "../../utils/colors/colors";
import HomeScreen from "../../scene/home";
import SearchSellerScreen from "../../scene/SearchSong";

const SearchStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="SearchSellerScreen"
        component={SearchSellerScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default SearchStackNavigator;
