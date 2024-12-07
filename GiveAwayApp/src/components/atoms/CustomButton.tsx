import React from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import Dimensions from '../../utils/dimension/dimensions';
import {Fonts} from '../../utils/fonts/fonts';
import {fontScaleNormalize} from '../../utils/functions/commanFunctions';

import CustomText from './CustomText';

const CustomButton = (props: any) => {
  const {
    title = '',
    style,
    textStyle,
    disabled = false,
    isIcon = false,
    imageSource = '',
    mainStyle,
    label = '',
    hasError = false,
    loading = false,
    imageStyle,
    indicatorColor = Colors.Black,
  } = props;

  return (
    <View style={[mainStyle]}>
      {label.length > 0 && (
        <Text style={{color: Colors.Grey, fontFamily: Fonts.Regular}}>
          {label}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.defaultStyle,
          {
            backgroundColor: disabled ? Colors.Grey : Colors.Black,
            paddingHorizontal: isIcon ? 20 : 0,
          },
          style,
        ]}
        disabled={disabled || loading ? true : false}
        onPress={() => props.onPress()}>
        {loading ? (
          <ActivityIndicator
            size={'small'}
            color={indicatorColor}
            style={{alignSelf: 'center'}}></ActivityIndicator>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <CustomText
              style={[
                {
                  color: Colors.Black,
                  fontSize: fontScaleNormalize(15),
                  fontFamily: Fonts.Regular,
                  flex: isIcon ? 1 : null,
                  fontWeight: '700',
                },
                textStyle,
              ]}>
              {title}
            </CustomText>
            {isIcon && (
              <Image
                source={imageSource}
                style={[
                  {height: 15, width: 15, tintColor: Colors.Black},
                  imageStyle,
                ]}></Image>
            )}
          </View>
        )}
      </TouchableOpacity>
      {hasError && (
        <CustomText style={{color: Colors.Red}}>
          *This field can not be empty
        </CustomText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  defaultStyle: {
    height: Platform.OS == 'ios' ? Dimensions.HP_5 : Dimensions.HP_6,
    // width: Dimensions.WP_83,
    borderRadius: 30,
    backgroundColor: Colors.Black,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default CustomButton;
