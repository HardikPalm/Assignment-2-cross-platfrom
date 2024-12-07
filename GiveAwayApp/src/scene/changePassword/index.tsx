import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useState} from 'react';
import {Colors} from '../../utils/colors/colors';
import CustomTextInput from '../../components/atoms/CustomTextInput';
import Dimensions from '../../utils/dimension/dimensions';
import {Fonts} from '../../utils/fonts/fonts';
import CustomButton from '../../components/atoms/CustomButton';
import EyeOpen from '../../assets/svgs/EyeOpenLogo';
import EyeClose from '../../assets/svgs/EyeCloseLogo';
import {
  ErrorMessages,
  PasswordValidation,
} from '../../utils/constants/constants';
import {changePassword} from './service';
import {CurrentErrorContext} from '../../context/error_message_context';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [objectError, setObjectError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const ErrorContext = useContext(CurrentErrorContext);

  function isValid() {
    const newPasswordResult = PasswordValidation.test(newPassword);

    if (oldPassword.length == 0) {
      setObjectError(prevState => ({
        ...prevState,
        oldPassword: true,
      }));
      return false;
    } else if (
      newPassword.length == 0 ||
      (newPassword.length > 0 && !newPasswordResult)
    ) {
      setObjectError(prevState => ({
        ...prevState,
        newPassword: true,
      }));
      return false;
    } else if (newPassword != confirmNewPassword) {
      setObjectError(prevState => ({
        ...prevState,
        confirmNewPassword: true,
      }));
      return false;
    }
    return true;
  }

  return (
    <View style={{flex: 1, backgroundColor: Colors.Black, paddingTop: 25}}>
      <View style={{flex: 1}}>
        <CustomTextInput
          mainStyle={[styles.textInputStyle]}
          placeHolder={'Old password'}
          value={oldPassword}
          placeHolderTextColor={Colors.Grey}
          titleStyle={{color: Colors.Green}}
          Label={'Old Password'}
          textInputStyle={styles.mainTextInputStyle}
          parentStyle={styles.parentStyle}
          hasError={objectError.oldPassword}
          secureTextEntry={!oldPasswordVisible}
          isRightIcon={true}
          onIconPress={() => setOldPasswordVisible(!oldPasswordVisible)}
          rightIcon={
            !oldPasswordVisible ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
          }
          onChangeText={(text: string) => {
            setOldPassword(text);
            if (objectError.oldPassword) {
              setObjectError(prevState => ({
                ...prevState,
                oldPassword: false,
              }));
            }
          }}></CustomTextInput>
        <CustomTextInput
          mainStyle={styles.textInputStyle}
          value={newPassword}
          titleStyle={{color: Colors.Green, marginTop: 15}}
          Label={'New Password'}
          placeHolder={'New Password'}
          placeHolderTextColor={Colors.Grey}
          parentStyle={styles.parentStyle}
          textInputStyle={styles.mainTextInputStyle}
          errorMessage={ErrorMessages.passwordValidation}
          hasError={objectError.newPassword}
          secureTextEntry={!newPasswordVisible}
          isRightIcon={true}
          onIconPress={() => setNewPasswordVisible(!newPasswordVisible)}
          rightIcon={
            !newPasswordVisible ? <EyeOpen></EyeOpen> : <EyeClose></EyeClose>
          }
          onChangeText={(text: string) => {
            setNewPassword(text);
            if (objectError.newPassword) {
              setObjectError(prevState => ({
                ...prevState,
                newPassword: false,
              }));
            }
          }}></CustomTextInput>
        <CustomTextInput
          mainStyle={styles.textInputStyle}
          value={confirmNewPassword}
          titleStyle={{color: Colors.Green, marginTop: 15}}
          Label={'Confirm New Password'}
          placeHolder={'Confirm New Password'}
          placeHolderTextColor={Colors.Grey}
          textInputStyle={styles.mainTextInputStyle}
          parentStyle={styles.parentStyle}
          hasError={objectError.confirmNewPassword}
          errorMessage={ErrorMessages.confirmPasswordValidation}
          secureTextEntry={!confirmNewPasswordVisible}
          isRightIcon={true}
          onIconPress={() =>
            setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
          }
          rightIcon={
            !confirmNewPasswordVisible ? (
              <EyeOpen></EyeOpen>
            ) : (
              <EyeClose></EyeClose>
            )
          }
          onChangeText={(text: string) => {
            setConfirmNewPassword(text);
            if (objectError.confirmNewPassword) {
              setObjectError(prevState => ({
                ...prevState,
                confirmNewPassword: false,
              }));
            }
          }}></CustomTextInput>
      </View>
      <CustomButton
        title={'Update'}
        style={styles.buttonStyle}
        loading={loading}
        onPress={() => {
          if (isValid()) {
            var finalData = {
              OldPassword: oldPassword,
              Password: newPassword,
              ConfirmPassword: confirmNewPassword,
            };
            changePassword(setLoading, finalData, ErrorContext);
            //     // registerUser(obj, setLoading, ErrorContext)
          }
        }}></CustomButton>
    </View>
  );
};

export default ChangePassword;

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
    alignSelf: 'center',
    fontFamily: Fonts.Bold,
  },
  subTitleStyle: {
    fontSize: 18,
    color: Colors.White,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 14,
  },
  textInputStyle: {
    backgroundColor: Colors.Black_10,
    width: Dimensions.WP_90,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
  },
  mainTextInputStyle: {
    color: Colors.Grey,
    width: Dimensions.WP_90,
  },
  buttonStyle: {
    backgroundColor: Colors.Green,
    width: Dimensions.WP_50,
    marginBottom: Dimensions.HP_6,
    alignSelf: 'center',
  },
  parentStyle: {
    width: Dimensions.WP_90,
  },
});
