import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {Images} from '../../utils/imageSource/imageSource';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/colors/colors';

const merchandiseCardListing = () => {
  return (
    <View
      style={{
        borderRadius: 20,
        // position: 'absolute',
      }}>
      <LinearGradient
        colors={Colors.Card1LinearGradient}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={{
          height: 140,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          // overflow: 'hidden',
        }}>
        <Image
          source={Images.audienceListBackground}
          style={styles.imageStyle}></Image>
      </LinearGradient>
    </View>
  );
};

export default merchandiseCardListing;

const styles = StyleSheet.create({
  imageStyle: {
    height: 129,
    width: '96.5%',
    overflow: 'hidden',
    borderRadius: 20,
  },
});
