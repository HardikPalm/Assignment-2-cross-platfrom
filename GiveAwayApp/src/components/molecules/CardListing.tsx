import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ImageBackground} from 'react-native';
import {Images} from '../../utils/imageSource/imageSource';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/colors/colors';
import CustomText from '../atoms/CustomText';

const CardListing = () => {
  return (
    <>
      <View
        style={{
          borderRadius: 20,
          position: 'absolute',
          zIndex: 999,
          height: 140,
          width: '96.5%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          backgroundColor: Colors.cyan,
          opacity: 0.3,
        }}></View>
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
        }}>
        <Image
          source={Images.curatedListBackground}
          style={styles.imageStyle}></Image>
      </LinearGradient>
      <View
        style={{
          // position: 'absolute',
          // paddingTop: 50,
          zIndex: 999,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <CustomText style={{color: Colors.White, textAlign: 'center'}}>
          {'Curated Playlist'}
        </CustomText>
      </View>
    </>
  );
};

export default CardListing;

const styles = StyleSheet.create({
  imageStyle: {
    height: 131,
    width: '96.5%',
    overflow: 'hidden',
    borderRadius: 20,
  },
});
