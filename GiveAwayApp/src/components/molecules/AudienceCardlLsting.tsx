import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Images} from '../../utils/imageSource/imageSource';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/colors/colors';

const AudienceCardListing = () => {
  return (
    <View style={styles.mainView}>
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
          source={Images.audienceListBackground}
          style={styles.imageStyle}></Image>
      </LinearGradient>
    </View>
  );
};

export default AudienceCardListing;

const styles = StyleSheet.create({
  imageStyle: {
    height: 129,
    width: '96.5%',
    overflow: 'hidden',
    borderRadius: 20,
  },
  mainView: {
    backgroundColor: Colors.cyan,
    borderRadius: 20,
    paddingTop: 0,
  },
});
