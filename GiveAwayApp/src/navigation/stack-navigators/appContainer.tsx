import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import AuthStack from "./authStack";
import { navigationRef } from "../service/navigationService";
import CurrentErrorProvider from "../../context/error_message_context";
import CurrentNetworkProvider from "../../context/network_context";
import FlashMessage from "react-native-flash-message";
import { Colors } from "../../utils/colors/colors";
import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
} from "react-native-track-player";
// import store from "../../redux/store/store";
import RootStackNavigator from "./rootStackNavigator";
import UserDataProvider from "../../context/user_context";

const AppContainer = () => {
  const Stack = createNativeStackNavigator();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={Colors.Black}
      ></StatusBar>
      <NavigationContainer ref={navigationRef}>
        {/* <Provider store={store}> */}
          <CurrentNetworkProvider>
            <CurrentErrorProvider>
              <UserDataProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="AuthStack"
                    component={AuthStack}
                  ></Stack.Screen>
                  <Stack.Screen
                    name="RootStack"
                    component={RootStackNavigator}
                  ></Stack.Screen>
                </Stack.Navigator>
              </UserDataProvider>
            </CurrentErrorProvider>
          </CurrentNetworkProvider>
        {/* </Provider> */}
        <FlashMessage position={"top"} />
      </NavigationContainer>
    </View>
  );
};

export default AppContainer;
