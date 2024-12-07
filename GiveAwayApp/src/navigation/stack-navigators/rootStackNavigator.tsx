import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabNavigator from "../tab-navigators/bottomTabNavigator";
import UpdateProfile from "../../scene/updateProfile";
import { Colors } from "../../utils/colors/colors";
import ChangePassword from "../../scene/changePassword";

import PlaylistStack from "./productStack";
// import SongsStack from "./songsStack";

const RootStackNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={BottomTabNavigator}></Stack.Screen>
      {/* <Stack.Screen name="SongsStack" component={SongsStack}></Stack.Screen> */}
      <Stack.Screen
        name="PlaylistStack"
        component={PlaylistStack}
      ></Stack.Screen>

      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.Black },
          headerTintColor: Colors.White,
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: true,
          headerStyle: { backgroundColor: Colors.Black },
          headerTintColor: Colors.White,
        }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default RootStackNavigator;
