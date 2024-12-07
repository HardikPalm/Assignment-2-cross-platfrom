import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Dimensions from "../../utils/dimension/dimensions";
import { Colors } from "../../utils/colors/colors";
import { Fonts } from "../../utils/fonts/fonts";
import { Strings } from "./strings";
import CustomText from "../../components/atoms/CustomText";
import CustomTextInput from "../../components/atoms/CustomTextInput";
import CustomButton from "../../components/atoms/CustomButton";
import { Images } from "../../utils/imageSource/imageSource";
import CustomKeyboardAwareScrollView from "../../components/atoms/CustomKeyboardAwareScrollView";
import BottomText from "../../components/molecules/BottomText";
import TouchableSocialIcon from "../../components/molecules/TouchableSocialIcon";
import deviceInfoModule from "react-native-device-info";
import {
  Constants,
  emailValidation,
  ErrorMessages,
  googleWeClientId,
  PasswordValidation,
} from "../../utils/constants/constants";
import { CurrentErrorContext } from "../../context/error_message_context";
import { registerUser } from "../../service/auth/authService";
import { authType } from "../../utils/enum/enums";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import EyeOpen from "../../assets/svgs/EyeOpenLogo";
import EyeClose from "../../assets/svgs/EyeCloseLogo";
import { UserDataContext } from "../../context/user_context";

const Register = (props: any) => {
  const [apiObject, setApiObject] = useState({
    firstName: "",
    lastName: "",
    countrycode:"",
    email: "",
    mobileNumber: "", // Added contact number
    password: "",
    serialNumber: "",
    roleType: "Customer",
    os: "",
    modelNo: "",
    brand: "",
    appType: "App",
    authType: "Local",
    versionNumber: Constants.versionNumber,
  });
  const [objectError, setObjectError] = useState({
    firstName: false,
    lastName: false,
    email: false,
    countrycode:false,
    mobileNumber: false, // Added error state for contact number
    password: false,
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorContext = useContext(CurrentErrorContext);

  useEffect(() => {
    getDeviceInfo();
  }, []);

  /**configuring google web Id */
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: googleWeClientId,
      offlineAccess: false,
    });
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
    const passwordResult = PasswordValidation.test(apiObject.password);

    if (apiObject.firstName.length == 0) {
      setObjectError((prevState) => ({
        ...prevState,
        firstName: true,
      }));

      return false;
    } else if (apiObject.lastName.length == 0) {
      setObjectError((prevState) => ({
        ...prevState,
        lastName: true,
      }));

      return false;
    } else if (apiObject.email.trim().length === 0) {
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
    } else if (apiObject.mobileNumber.length === 0) {
      setObjectError((prevState) => ({
        ...prevState,
        mobileNumber: true,
      }));
      return false;
    } else if (
      apiObject.password.length == 0 ||
      (apiObject.password.length > 0 && !passwordResult)
    ) {
      setObjectError((prevState) => ({
        ...prevState,
        password: true,
      }));
      return false;
    }

    return true;
  }

  return (
    <CustomKeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.primary}
    >
      <CustomText style={styles.titleStyle}>{Strings.title}</CustomText>
      {/* <CustomText style={styles.subTitleStyle}>{Strings.subTitle}</CustomText> */}
      <CustomTextInput
        mainStyle={[styles.textInputStyle, { marginTop: 25 }]}
        placeHolder={Strings.firstName}
        placeHolderTextColor={Colors.Grey}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.firstName}
        onChangeText={(text: string) => {
          setApiObject((prevState) => ({
            ...prevState,
            firstName: text.toString().trim(),
          }));
          if (objectError.firstName) {
            setObjectError((prevState) => ({
              ...prevState,
              firstName: false,
            }));
          }
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.lastName}
        placeHolderTextColor={Colors.Grey}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.lastName}
        onChangeText={(text: string) => {
          setApiObject((prevState) => ({
            ...prevState,
            lastName: text.toString().trim(),
          }));
          if (objectError.lastName) {
            setObjectError((prevState) => ({
              ...prevState,
              lastName: false,
            }));
          }
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.email}
        placeHolderTextColor={Colors.Grey}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.email}
        errorMessage={
          objectError.email && apiObject.email.trim().length === 0
            ? ErrorMessages.emailValidation2
            : ErrorMessages.emailValidation
        }
        onChangeText={(text: string) => {
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
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.countrycode} 
        placeHolderTextColor={Colors.Grey}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.countrycode} 
        errorMessage={ErrorMessages.countrycdevalidation} 
        onChangeText={(text: string) => {
          setApiObject((prevState) => ({
            ...prevState,
            countrycode: text.toString().trim(),
          }));
          if (objectError.countrycode) {
            setObjectError((prevState) => ({
              ...prevState,
              countrycode: false,
            }));
          }
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.mobileNumber} // Added contact number placeholder
        placeHolderTextColor={Colors.Grey}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.mobileNumber} // Added error state for contact number
        errorMessage={ErrorMessages.mobileNumberValidation} // Add error message for contact number
        onChangeText={(text: string) => {
          setApiObject((prevState) => ({
            ...prevState,
            mobileNumber: text.toString().trim(),
          }));
          if (objectError.mobileNumber) {
            setObjectError((prevState) => ({
              ...prevState,
              mobileNumber: false,
            }));
          }
        }}
      ></CustomTextInput>
      <CustomTextInput
        mainStyle={styles.textInputStyle}
        placeHolder={Strings.password}
        placeHolderTextColor={Colors.Grey}
        secureTextEntry={!passwordVisible}
        textInputStyle={styles.mainTextInputStyle}
        hasError={objectError.password}
        errorMessage={ErrorMessages.passwordValidation}
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
        style={styles.buttonStyle}
        loading={loading}
        onPress={() => {
          if (isValid()) {
            var obj: any = { ...apiObject };
            obj["fullName"] = obj.firstName + " " + obj.lastName;
            delete obj?.firstName;
            delete obj?.lastName;
            registerUser(obj, setLoading, ErrorContext);
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
        title={"Already have an account?"}
        subTitle={"Login"}
        onPress={() => {
          props.navigation.navigate("login");
        }}
      ></BottomText>
      <CustomText
        style={{
          color: Colors.White,
          alignSelf: "center",
          marginTop: 15,
          fontSize: 12,
        }}
      >
        By continuing you agree to APP's{" "}
        <CustomText style={{ color: Colors.Green }}>Terms</CustomText>
      </CustomText>
      <CustomText
        style={{ color: Colors.Green, alignSelf: "center", fontSize: 12 }}
      >
        & Conditions
        <CustomText style={{ color: Colors.White }}> and </CustomText>
        <CustomText style={{ color: Colors.Green }}>Privacy Policy</CustomText>
      </CustomText>
    </CustomKeyboardAwareScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.Black,
    paddingTop: Dimensions.HP_10,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    marginTop: 14,
  },
  textInputStyle: {
    backgroundColor: Colors.Black_10,
    // width: Dimensions.WP_80,
    borderRadius: 10,
    alignSelf: "center",
  },
  mainTextInputStyle: {
    color: Colors.Grey,
  },
  buttonStyle: {
    backgroundColor: Colors.Green,
    width: Dimensions.WP_50,
    marginTop: Dimensions.HP_6,
    alignSelf: "center",
  },
});
