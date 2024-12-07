import {
  StyleSheet,
  Text,
  View,
  ViewStyle,
  StyleProp,
  ImageBackground,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import IconButton from '../molecules/IconButton';
import {Colors} from '../../utils/colors/colors';
import CustomText from './CustomText';
import Dimensions from '../../utils/dimension/dimensions';
import {Images} from '../../utils/imageSource/imageSource';

interface ChildComponentProps {
  source?: string;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  onPress: Function;
}

const LinearGradientButton = (props: ChildComponentProps) => {
  const {buttonStyle, style, source, onPress} = props;
  return (
    // <LinearGradient
    //     start={{ x: 0.5, y: 1.0 }} end={{ x: 0.0, y: 0.25 }}
    //     colors={Colors.LinearGradient}
    //     style={[style]}>
    <ImageBackground
      style={[
        {
          height: Dimensions.WP_32,
          width: Dimensions.WP_32,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        },
      ]}
      source={Images.buttonBackground}>
      <IconButton
        icon={source}
        onPress={onPress}
        style={buttonStyle}></IconButton>
    </ImageBackground>
    // </LinearGradient>
  );
};

export default LinearGradientButton;

const styles = StyleSheet.create({});
