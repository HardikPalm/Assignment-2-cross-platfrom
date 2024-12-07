import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../utils/colors/colors';
import {Fonts} from '../../utils/fonts/fonts';

const CustomText = (props: any) => {
  const {style, numberOfLines = null} = props;

  return (
    <Text
      style={[styles.defaultStyle, style]}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {props.children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  defaultStyle: {
    color: Colors.White,
    fontFamily: Fonts.Regular,
  },
});
