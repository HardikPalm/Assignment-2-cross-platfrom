import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';
import CustomText from './CustomText';
// import Cross from '../res/Svgs/Cross.svg'

const CustomTextInput = (props: any) => {
  const {
    isNumber = false,
    dialCode = 61,
    mainStyle,
    textInputStyle,
    isLeftIcon = false,
    isRightIcon = false,
    placeHolder,
    onPress,
    keyboardType = 'default',
    value,
    isPress = false,
    hasError = false,
    errorMessage = 'This field can not be empty',
    returnKeyType = 'default',
    maxLength = null,
    focusNeeded = false,
    editable = true,
    titleStyle,
    Label = '',
    mainContainer,
    secureTextEntry = false,
    imageSource,
    placeHolderTextColor,
    onButtonPress,
    parentStyle,
  } = props;

  const RightIcon = () => {
    return props.rightIcon;
  };

  const LeftIcon = () => {
    return props.leftIcon;
  };
  return (
    <View style={[{width: Dimensions.WP_80, alignSelf: 'center'}, parentStyle]}>
      <CustomText style={[titleStyle]}>{Label}</CustomText>
      <TouchableOpacity
        style={[
          styles.MainContainer,
          {borderColor: hasError ? 'red' : Colors.Disable2},
          mainStyle,
        ]}
        activeOpacity={1}
        onPress={onButtonPress ? onButtonPress : null}>
        {isNumber && (
          <View style={styles.DialCodeContainer}>
            <CustomText style={{color: Colors.Black}}>
              {'+' + dialCode}
            </CustomText>
          </View>
        )}
        {isLeftIcon && (
          <TouchableOpacity
            style={styles.IconButtonStyle}
            onPress={() => {
              props.onIconPress();
            }}>
            {LeftIcon()}
          </TouchableOpacity>
        )}
        <TextInput
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          editable={editable}
          value={value}
          onPressIn={() => {
            if (isPress) {
              onPress();
            }
          }}
          onFocus={() => {
            if (focusNeeded) {
              props.onFocus();
            }
          }}
          onBlur={() => {
            if (focusNeeded) {
              props.onBlur();
            }
          }}
          style={[styles.textInputStyle, textInputStyle]}
          placeholder={placeHolder}
          placeholderTextColor={
            placeHolderTextColor ? placeHolderTextColor : Colors.Disable2
          }
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          onChangeText={text => {
            props.onChangeText(text);
          }}></TextInput>
        {isRightIcon && (
          <TouchableOpacity
            style={styles.IconButtonStyle}
            onPress={() => {
              props.onIconPress();
            }}>
            {RightIcon()}
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {hasError && (
        <Text style={{color: 'red', marginTop: 2}}>*{errorMessage}</Text>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    height: Dimensions.HP_7_1,

    // marginTop: 10
  },
  DialCodeContainer: {
    marginStart: 10,
    marginRight: 5,
    flexDirection: 'row',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputStyle: {
    flex: 1,
    color: Colors.Black,
  },
  IconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    // height: 17,
    // width: 17,
    // borderRadius: 17,
    alignSelf: 'center',
    // backgroundColor: Colors.Black
  },
  IconStyle: {},
});
