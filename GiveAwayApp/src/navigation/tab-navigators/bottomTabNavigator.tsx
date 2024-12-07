import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Colors } from "../../utils/colors/colors";
import { Platform, StyleSheet, Text, View } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import Dimensions from "../../utils/dimension/dimensions";
import Profile from "../../scene/profile";
import HomeIcon from "../../assets/svgs/HomeIcon";
import SearchIcon from "../../assets/svgs/SearchIcon";
import { fontScaleNormalize } from "../../utils/functions/commanFunctions";
import deviceInfoModule from "react-native-device-info";
import HomeStackNavigator from "../stack-navigators/homeStackNavigator";
import SearchStackNavigator from "../stack-navigators/SearchStackNavigator";
import ProfileIcon from "../../assets/svgs/ProfileIcon";
import { Fonts } from "../../utils/fonts/fonts";
import { Animated } from "react-native";
import PlaylistStack from "../stack-navigators/productStack";
import PlaylistIcon from "../../assets/svgs/PlaylistIcon";
import ProfileStack from "../stack-navigators/profilestack";
import SmileyFaceIcon from "../../assets/svgs/SmileyfaceIcon";
import SvgComponent from "../../assets/svgs/Product";

const BottomTabNavigator = (props: any) => {
  const Tab = createBottomTabNavigator();
  let hasNotch = deviceInfoModule.hasNotch();

  const RenderTabLabel = ({ focused, color, label }) => {
    const trimmedLabel = label.substring(0, 15);
    const isLongLabel = label.length > 15;

    return (
      <Text
        style={{
          color: focused ? "yellow" : Colors.White,
          fontSize: fontScaleNormalize(11),
          textAlign: "center",
          paddingTop: 0,
          marginTop: 0,
          marginBottom: isIphoneX() ? 0 : 5,
        }}
      >
        {isLongLabel ? (
          <Animated.Text
            style={[
              styles.text1,
              {
                transform: [
                  {
                    translateX: right,
                  },
                ],
              },
            ]}
          >
            {trimmedLabel.split("").map((char, index) => (
              <Animated.Text
                key={index}
                style={{
                  transform: [
                    {
                      translateX: right.interpolate({
                        inputRange: [Dimensions.WP_1, Dimensions.WP_50],
                        outputRange: [0, 10],
                      }),
                    },
                  ],
                }}
              >
                {char}
              </Animated.Text>
            ))}
          </Animated.Text>
        ) : (
          trimmedLabel
        )}
      </Text>
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Colors.Black,
          tabBarShowLabel: true,
          tabBarInactiveTintColor: Colors.Grey,
          tabBarLabelStyle: { color: Colors.White },
          tabBarStyle: {
            height:
              Platform.OS == "ios" ? (hasNotch ? 190 : 92) : Dimensions.HP_8_5,
            backgroundColor: "rgba(32, 32, 32, 1)",
            borderWidth: 0,
            borderTopWidth: 0,
            paddingVertical: 5,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                <HomeIcon fill={focused ? "yellow" : Colors.White} />
              </View>
            ),
            tabBarLabel: ({ focused, color }) => (
              <RenderTabLabel
                focused={focused}
                label="Home"
                color={color}
              ></RenderTabLabel>
            ),
          }}
        />
        <Tab.Screen
          name="SearchStackNavigator"
          component={SearchStackNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View>
                <SearchIcon fill={focused ? "yellow" : Colors.White} />
              </View>
            ),
            tabBarLabel: ({ focused, color }) => (
              <RenderTabLabel
                focused={focused}
                label="Search"
                color={color}
              ></RenderTabLabel>
            ),
          }}
        />
        <Tab.Screen
          name="PlayListStack"
          component={PlaylistStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <SvgComponent fill={focused ? "yellow" : Colors.White} />
            ),
            tabBarLabel: ({ focused, color }) => (
              <RenderTabLabel
                focused={focused}
                label="My Products"
                color={color}
              ></RenderTabLabel>
            ),
          }}
        />
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <ProfileIcon fill={focused ? "yellow" : Colors.White} />
            ),
            tabBarLabel: ({ focused, color }) => (
              <RenderTabLabel
                focused={focused}
                label="Profile"
                color={color}
              ></RenderTabLabel>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: 10,
  },
  text1: {
    color: Colors.White,
    fontSize: fontScaleNormalize(15),
    fontFamily: Fonts.Regular,
    fontWeight: "500",
    lineHeight: 22,
  },
  text2: {
    color: Colors.White,
    fontSize: fontScaleNormalize(12),
    fontFamily: Fonts.SemiBold,
    fontWeight: "500",
    lineHeight: 26,
  },
  textFirstContainer: {
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: "center",
  },
  buttonTextContainer: {
    flexDirection: "row",
    paddingTop: Dimensions.HP_1_3,
  },
  textStyle: {
    alignSelf: "center",
    paddingLeft: Dimensions.WP_2,
    fontSize: fontScaleNormalize(16),
    fontWeight: "600",
    fontFamily: Fonts.Medium,
  },
  borderView: {},
  textView: {},
});

export default BottomTabNavigator;
