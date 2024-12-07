import { Platform, StyleSheet, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomText from "../../components/atoms/CustomText";
import { Fonts } from "../../utils/fonts/fonts";
import { Colors } from "../../utils/colors/colors";
import { Strings } from "./strings";
import Dimensions from "../../utils/dimension/dimensions";
import CustomTextInput from "../../components/atoms/CustomTextInput";
import CustomButton from "../../components/atoms/CustomButton";
import {
  Constants,
  emailValidation,
  ErrorMessages,
  googleWeClientId,
} from "../../utils/constants/constants";
import { CurrentErrorContext } from "../../context/error_message_context";
import deviceInfoModule from "react-native-device-info";
import TouchableSocialIcon from "../../components/molecules/TouchableSocialIcon";
import BottomText from "../../components/molecules/BottomText";
import { loginUser, socialLogin } from "../../service/auth/authService";
import { AsyncKey, Storage } from "../../utils/storage/storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { googleSignIn } from "../../service/goodleSignIn/service";
import { authType } from "../../utils/enum/enums";
import EyeOpen from "../../assets/svgs/EyeOpenLogo";
import EyeClose from "../../assets/svgs/EyeCloseLogo";
import { onAppleButtonPress } from "../../service/appleSignIn/appleSignInService";
import { UserDataContext } from "../../context/user_context";

const Login = (props: any) => {
  const [apiObject, setApiObject] = useState({
    email: "",
    password: "",
    serialNumber: "",
    os: "",
    modelNo: "",
    brand: "",
    appType: "App",
    authType: "Local",
    versionNumber: Constants.versionNumber,
  });
  const [objectError, setObjectError] = useState({
    email: false,
    password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorContext = useContext(CurrentErrorContext);

  function loginDecision() {
    if (Storage.contains(AsyncKey.AccessToken)) {
      props.navigation.replace("RootStack");
    }
  }

  /**configuring google web Id */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWeClientId,
      offlineAccess: false,
    });
  }, []);

  useEffect(() => {
    loginDecision();
    getDeviceInfo();
  }, []);

  /** Getting the device Info */
  async function getDeviceInfo() {
    var Serial = await deviceInfoModule.getUniqueId();
    setApiObject((prevState) => ({
      ...prevState,
      serialNumber: Serial,
      os: Platform.OS,
      brand: deviceInfoModule.getBrand(),
      modelNo: deviceInfoModule.getModel(),
    }));
  }

  function isValid() {
    const result = emailValidation.test(
      String(apiObject.email.trim()).toLowerCase()
    );
    if (apiObject.email.trim().length === 0) {
      setObjectError((prevState) => ({
        ...prevState,
        email: true,
      }));
      return false;
    } else if (!result) {
      setObjectError((prevState) => ({
        ...prevState,
        email: true,
      }));
      return false;
    } else if (apiObject.password.length == 0) {
      setObjectError((prevState) => ({
        ...prevState,
        password: true,
      }));
      return false;
    }

    return true;
  }

  return (
    <View style={styles.primary}>
      <CustomText style={styles.titleStyle}>{Strings.title}</CustomText>
      {/* <CustomText style={styles.subTitleStyle}>{Strings.subTitle}</CustomText> */}
      <CustomTextInput
        mainStyle={[styles.textInputStyle, { marginTop: 50 }]}
        placeHolder={Strings.email}
        placeHolderTextColor={Colors.Grey}
        hasError={objectError.email}
        textInputStyle={styles.mainTextInputStyle}
        errorMessage={
          objectError.email && apiObject.email.trim().length == 0
            ? ErrorMessages.emailValidation2
            : ErrorMessages.emailValidation
        }
        onChangeText={(text: string) => {
          if (text.startsWith(" ")) {
            // console.log("hjere");
            setObjectError((prevState) => ({
              ...prevState,
              email: true,
            }));
            return;
          } else {
            // console.log("there");
            setApiObject((prevState) => ({
              ...prevState,
              email: text.toString().trim(),
            }));
            if (objectError.email) {
              setObjectError((prevState) => ({
                ...prevState,
                email: false,
              }));
            }
          }
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.password}
        placeHolderTextColor={Colors.Grey}
        hasError={objectError.password}
        secureTextEntry={!passwordVisible}
        textInputStyle={styles.mainTextInputStyle}
        isRightIcon={true}
        onIconPress={() => setPasswordVisible(!passwordVisible)}
        rightIcon={
          !passwordVisible ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
        }
        onChangeText={(text: string) => {
          setApiObject((prevState) => ({
            ...prevState,
            password: text,
          }));
          if (objectError.password) {
            setObjectError((prevState) => ({
              ...prevState,
              password: false,
            }));
          }
        }}
      ></CustomTextInput>
      <CustomButton
        title={Strings.login}
        loading={loading}
        style={styles.buttonStyle}
        onPress={() => {
          if (isValid()) {
            loginUser(apiObject, setLoading, ErrorContext);
          }
        }}
      ></CustomButton>
      <CustomText
        style={{
          alignSelf: "center",
          marginVertical: 20,
          color: Colors.White,
        }}
      >
        Or
      </CustomText>
      <BottomText
        title={"Don't have an account?"}
        subTitle={"Register Free"}
        onPress={() => {
          props.navigation.navigate("register");
        }}
      ></BottomText>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.Black,
    paddingTop: Dimensions.HP_10,
  },
  titleStyle: {
    fontSize: 30,
    color: Colors.Green,
    alignSelf: "center",
    fontFamily: Fonts.Bold,
  },
  subTitleStyle: {
    fontSize: 18,
    color: Colors.White,
    alignSelf: "center",
    textAlign: "center",
    marginTop: 15,
  },
  textInputStyle: {
    backgroundColor: Colors.Black_10,
    width: Dimensions.WP_80,
    borderRadius: 10,
    alignSelf: "center",
  },
  mainTextInputStyle: {
    color: Colors.Grey,
  },
  buttonStyle: {
    backgroundColor: Colors.Green,
    width: Dimensions.WP_50,
    marginTop: Dimensions.HP_10,
    alignSelf: "center",
  },
});
