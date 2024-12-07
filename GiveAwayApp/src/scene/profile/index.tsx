import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Colors } from "../../utils/colors/colors";
import CustomButton from "../../components/atoms/CustomButton";
import Dimensions from "../../utils/dimension/dimensions";
import {
  fontScaleNormalize,
  logout,
  resetStack,
} from "../../utils/functions/commanFunctions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { TouchableOpacity } from "react-native";
import CustomText from "../../components/atoms/CustomText";
import { Images } from "../../utils/imageSource/imageSource";
import { AsyncKey, Storage } from "../../utils/storage/storage";
import BoldText from "../../components/atoms/BoldText";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { deleteUser } from "./service";
import { CurrentErrorContext } from "../../context/error_message_context";
import TrackPlayer from "react-native-track-player";
import { UserDataContext } from "../../context/user_context";
import { getWalletData } from "../../service/home";

const Profile = (props: any) => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const ErrorContext = useContext(CurrentErrorContext);

  useFocusEffect(
    useCallback(() => {
      if (Storage.contains("UserData")) {
        var userData: any = Storage.getString(AsyncKey.UserData);
        userData = JSON.parse(userData);
        setUserName(userData?.fullName);
        setEmail(userData?.email);
        setUserId(userData?.userId);
      }
    }, [])
  );

  const MenuItem = (props: any) => {
    const { imageUrl = "", title = "", onPress, fromDelete = false } = props;

    return (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingTop: 15,
          paddingHorizontal: 15,
          alignContent: "center",
        }}
        onPress={onPress}
      >
        <Image
          style={{
            width: Dimensions.WP_6,
            height: Dimensions.WP_6,
            tintColor: Colors.White,
          }}
          source={imageUrl}
        ></Image>
        <View
          style={{
            paddingBottom: 17,
            flex: 1,
            marginLeft: 20,
            borderBottomWidth: 0,
            borderColor: Colors.Green,
          }}
        >
          <CustomText
            style={{
              fontSize: fontScaleNormalize(14),
              color: Colors.White,
            }}
          >
            {title}
          </CustomText>
        </View>
        <Image
          style={{
            width: Dimensions.WP_4,
            height: Dimensions.WP_4,
            tintColor: Colors.White,
          }}
          source={Images.arrow}
        ></Image>
      </TouchableOpacity>
    );
  };

  async function UserLogOut() {
    Storage.clearAll();
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: "AuthStack" }],
    });
    props.navigation.dispatch(resetAction);
  }

  function deleteAccount() {
    Alert.alert("Delete", "Are you sure you want to delete your account?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          deleteUser(setLoading, userId, ErrorContext)
            .then(() => {
              UserLogOut();
            })
            .catch((error) => {
              console.log(`============error==============`);
              console.log(error);
              console.log(`============error==============`);
            });
        },
      },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.Black }}>
      <View style={{ flex: 1, paddingTop: 50 }}>
        <View style={{ padding: 15 }}>
          <Pressable onPress={() => props.navigation.navigate("UpdateProfile")}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {userName?.length > 0 && (
                <View
                  style={{
                    height: Dimensions.WP_20,
                    aspectRatio: 1,
                    borderRadius: Dimensions.WP_20,
                    backgroundColor: Colors.Green,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <BoldText
                    style={{
                      color: Colors.Black,
                      fontSize: fontScaleNormalize(35),
                    }}
                  >
                    {userName.charAt(0)}
                  </BoldText>
                </View>
              )}
              <View style={{ padding: 20, alignSelf: "center" }}>
                {userName?.length > 0 && (
                  <BoldText
                    style={{
                      fontSize: fontScaleNormalize(18),
                      color: Colors.White,
                    }}
                  >
                    {userName}
                  </BoldText>
                )}
                {email?.length > 0 && (
                  <CustomText
                    style={{
                      fontSize: fontScaleNormalize(15),
                      marginTop: 2,
                      color: Colors.White,
                    }}
                  >
                    {email}
                  </CustomText>
                )}
              </View>
              <Image
                style={{
                  width: Dimensions.WP_4,
                  height: Dimensions.WP_4,
                  tintColor: Colors.White,
                }}
                source={Images.arrow}
              ></Image>
            </View>
          </Pressable>
        </View>
        <View style={{ flex: 1 }}>
          <MenuItem
            onPress={() => console.log("account settings")}
            title="Account Settings"
            imageUrl={Images.editProfile}
          ></MenuItem>
          <MenuItem
            onPress={() => console.log("account settings")}
            title="Terms and Conditions"
            imageUrl={Images.frame}
          ></MenuItem>
          <MenuItem
            onPress={() => console.log("account settings")}
            title="Privacy Policy"
            imageUrl={Images.Frame1}
          ></MenuItem>
          <MenuItem
            onPress={() => console.log("account settings")}
            title="Version Control"
            imageUrl={Images.clock}
          ></MenuItem>
          <MenuItem
            onPress={() => props.navigation.navigate("ChangePassword")}
            title="Change Password"
            imageUrl={Images.lock}
          ></MenuItem>
          <MenuItem
            onPress={() => props.navigation.navigate("AddProductScreen")}
            title="Add Products"
            imageUrl={Images.lock}
          ></MenuItem>
        </View>
        <CustomButton
          title={"Logout"}
          loading={false}
          // indicatorColor={Colors.AppThemeBlue}
          onPress={async () => {
            // props.navigation.reset()
            Alert.alert("Log out", "Are you sure you want to log out?", [
              {
                text: "No",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Yes",
                onPress: UserLogOut,
              },
            ]);
          }}
          style={{
            backgroundColor: Colors.Black,
            borderWidth: 1,
            borderColor: Colors.Green,
            // padding: 20,
            // alignSelf: 'flex-end',
            // width: '40%'
            width: Dimensions.WP_80,
            alignSelf: "center",
            // marginTop: Dimensions.WP_72,
          }}
          textStyle={{
            color: Colors.Green,
            alignSelf: "center",
          }}
        ></CustomButton>
        <Pressable onPress={deleteAccount}>
          <Text
            style={{
              fontSize: 20,
              color: Colors.Red,
              alignSelf: "center",
              marginVertical: Dimensions.HP_2,
            }}
          >
            Delete Account
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
